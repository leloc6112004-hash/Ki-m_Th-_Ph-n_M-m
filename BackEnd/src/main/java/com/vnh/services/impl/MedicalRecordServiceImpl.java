package com.vnh.services.impl;

import com.vnh.dto.MedicalRecordDTO;
import com.vnh.pojo.MedicalRecords;
import com.vnh.repositories.MedicalRecordRepository;
import com.vnh.services.MedicalRecordService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MedicalRecordServiceImpl implements MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepo;

    @Override
    public List<MedicalRecordDTO> getMedicalRecordsByUserId(int userId) {
        List<MedicalRecords> records = medicalRecordRepo.getMedicalRecordsByPatientId(userId);
        return records.stream().map(r -> {
            MedicalRecordDTO dto = new MedicalRecordDTO();
            dto.setId(r.getId());
            dto.setDiagnosis(r.getDiagnosis());
            dto.setSymptoms(r.getSymptoms());
            // Giả sử DTO của bạn có setCreatedAt hoặc tên khác, tôi dùng đúng field trong POJO
            // dto.setCreatedDate(r.getCreatedAt()); 
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void createMedicalRecord(MedicalRecordDTO medicalRecordDto) {
        // Logic triển khai
    }

    @Override
    public List<MedicalRecords> getMedicalRecordsByPatientId(int patientId) {
        return medicalRecordRepo.getMedicalRecordsByPatientId(patientId);
    }
}
