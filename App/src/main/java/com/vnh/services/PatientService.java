/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.services;

import com.vnh.dto.PatientDto;

import com.vnh.pojo.Patients;
import java.util.List;

/**
 *
 * @author Nguyen Hung
 */
public interface PatientService {

    Patients getPatientById(int id);

    Patients getPatientByUserId(int userId);

    Patients addPatient(Patients p);

    List<Patients> findByDoctorId(int doctorId);

    PatientDto getPatientByUsername(String username);
}
