package com.vnh.services.impl;

import com.vnh.dto.MedicalRecordDTO;

import com.vnh.dto.PrescriptionDTO;
import com.vnh.dto.UserDto;
import com.vnh.pojo.Appointments;

import com.vnh.pojo.MedicalRecords;
import com.vnh.pojo.Patients;
import com.vnh.pojo.PrescriptionDetails;
import com.vnh.pojo.Users;
import com.vnh.repositories.AppointmentRepository;
import com.vnh.repositories.MedicalRecordRepository;
import com.vnh.repositories.PatientRepository;
import com.vnh.repositories.UserRepository;
import com.vnh.services.MedicalRecordService;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    @Transactional
    public List<MedicalRecordDTO> getMedicalRecordsByUserId(int userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        Users currentUser = userRepository.getUserByUsername(currentUsername);

        if (currentUser == null || currentUser.getId() != userId) {
            throw new AccessDeniedException("Bạn không có quyền truy cập hồ sơ của người dùng khác.");
        }

        if (currentUser.getPatients() != null) {
            int patientId = currentUser.getPatients().getId();

            // Lấy dữ liệu POJO từ repository
            List<MedicalRecords> records = medicalRecordRepository.findByPatientId(patientId);

            // Chuyển đổi List<MedicalRecords> sang List<MedicalRecordDto>
            return records.stream().map(this::convertToDto).collect(Collectors.toList());
        }

        return Collections.emptyList();
    }

    private MedicalRecordDTO convertToDto(MedicalRecords record) {
        MedicalRecordDTO dto = new MedicalRecordDTO();
        dto.setId(record.getId());
        dto.setDiagnosis(record.getDiagnosis());
        dto.setSymptoms(record.getSymptoms());
        dto.setTreatmentPlan(record.getTreatmentPlan());
        dto.setCreatedAt(record.getCreatedAt());

        if (record.getAppointmentId() != null && record.getAppointmentId().getDoctorId() != null) {
            dto.setDoctorName(record.getAppointmentId().getDoctorId().getUsers().getFullName());
        }
        if (record.getAppointmentId() != null) {
            dto.setExamDate(record.getAppointmentId().getAppointmentDate());
        }
        if (record.getPatientId() != null && record.getPatientId().getUserId() != null) {
            dto.setPatientName(record.getPatientId().getUserId().getFullName());
        }

        if (record.getPrescriptionsCollection() != null) {
            List<PrescriptionDTO> prescriptionDtos = record.getPrescriptionsCollection().stream()
                    .flatMap(prescription -> prescription.getPrescriptionDetailsCollection().stream())
                    .map(this::convertToPrescriptionDto)
                    .collect(Collectors.toList());
            dto.setPrescriptions(prescriptionDtos);
        }

        return dto;
    }

    private PrescriptionDTO convertToPrescriptionDto(PrescriptionDetails detail) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setMedicineName(detail.getMedicines().getName());
        dto.setQuantity(detail.getQuantity());
        dto.setInstruction(detail.getInstruction());
        return dto;
    }

    @Override
    @Transactional
    public void createMedicalRecord(MedicalRecordDTO medicalRecordDto) {

        Appointments appointment = appointmentRepository.getAppointmentById(medicalRecordDto.getAppointmentId());

        if (appointment == null) {
            throw new IllegalArgumentException("Không tìm thấy lịch hẹn với ID: " + medicalRecordDto.getAppointmentId());
        }

        Patients patient = appointment.getPatientId();

        if (patient == null) {
            throw new IllegalArgumentException("Không tìm thấy thông tin bệnh nhân liên quan đến lịch hẹn này.");
        }

        MedicalRecords medicalRecord = new MedicalRecords();
        medicalRecord.setPatientId(patient);
        medicalRecord.setAppointmentId(appointment);
        medicalRecord.setDiagnosis(medicalRecordDto.getDiagnosis());
        medicalRecord.setSymptoms(medicalRecordDto.getSymptoms());
        medicalRecord.setTreatmentPlan(medicalRecordDto.getTreatmentPlan());
        medicalRecord.setCreatedAt(new Date());

        // 4. Lưu hồ sơ vào cơ sở dữ liệu
        medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public List<MedicalRecords> getMedicalRecordsByPatientId(int patientId) {
        return this.medicalRecordRepository.getMedicalRecordsByPatientId(patientId);
    }
}
