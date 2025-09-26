/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.repositories;

import com.vnh.pojo.MedicalRecords;
import com.vnh.pojo.Patients;
import java.util.List;

/**
 *
 * @author Nguyen Hung
 */
public interface PatientRepository {

    Patients getPatientById(int id);

    Patients getPatientByUserId(int userId);

    Patients addPatient(Patients p);

    List<Patients> findByDoctorId(int doctorId);
}
