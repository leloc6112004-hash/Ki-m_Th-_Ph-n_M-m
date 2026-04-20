package com.vnh.services.impl;

import com.vnh.dto.DoctorAppointmentDto;
import com.vnh.pojo.Appointments;
import com.vnh.repositories.AppointmentRepository;
import com.vnh.services.AppointmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<Appointments> getAppointmentsByDoctorId(Integer doctorId) {
        // Trả về trực tiếp từ Repository
        return this.appointmentRepository.findByDoctorId_Id(doctorId);
    }

    @Override
    public List<Appointments> getAppointmentsByPatientId(Integer patientId) {
        return this.appointmentRepository.findByPatientId_Id(patientId);
    }
}
