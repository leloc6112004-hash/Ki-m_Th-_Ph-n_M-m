/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.services;

import com.vnh.dto.DoctorAppointmentDto;
import com.vnh.pojo.Appointments;
import java.util.List;

/**
 *
 * @author Nguyen Hung
 */
public interface AppointmentService {

    List<Appointments> getAppointments();

    Appointments getAppointmentById(int id);

    void saveAppointment(Appointments appointment);

    List<DoctorAppointmentDto> getAppointmentsByDoctorId(Integer doctorId);

    List<Appointments> getAppointmentsByPatientId(Integer patientId);
}
