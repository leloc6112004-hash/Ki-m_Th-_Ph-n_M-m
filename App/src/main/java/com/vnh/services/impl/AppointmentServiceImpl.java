/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.services.impl;

import com.vnh.dto.DoctorAppointmentDto;
import com.vnh.pojo.Appointments;
import com.vnh.repositories.AppointmentRepository;
import com.vnh.services.AppointmentService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nguyen Hung
 */
@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public List<Appointments> getAppointments() {
        return appointmentRepository.getAppointments();
    }

    @Override
    public Appointments getAppointmentById(int id) {
        return appointmentRepository.getAppointmentById(id);
    }

    @Override
    public void saveAppointment(Appointments appointment) {
        appointmentRepository.saveAppointment(appointment);
    }

    @Override
    public List<DoctorAppointmentDto> getAppointmentsByDoctorId(Integer doctorId) {
        List<Appointments> appointments = this.appointmentRepository.findByDoctorId_Id(doctorId);
        return appointments.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<Appointments> getAppointmentsByPatientId(Integer patientId) {
        return this.appointmentRepository.findByPatientId_Id(patientId);
    }

    private DoctorAppointmentDto convertToDto(Appointments appointment) {
        DoctorAppointmentDto dto = new DoctorAppointmentDto();
        dto.setId(appointment.getId());
        dto.setReason(appointment.getReason());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        if (appointment.getPatientId() != null) {
            dto.setPatientName(appointment.getPatientId().getUserId().getFullName());

            // Thêm kiểm tra null trước khi lấy ID
            if (appointment.getPatientId().getUserId() != null) {
                dto.setPatientId(Long.valueOf(appointment.getPatientId().getUserId().getId()));
            }
        }
        return dto;
    }
}
