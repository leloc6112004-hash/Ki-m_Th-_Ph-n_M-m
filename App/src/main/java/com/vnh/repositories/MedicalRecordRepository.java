/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.repositories;

import com.vnh.pojo.MedicalRecords;
import java.util.List;

/**
 *
 * @author Nguyen Hung
 */
public interface MedicalRecordRepository {
    List<MedicalRecords> findByPatientId(int patientId);
    MedicalRecords getMedicalRecordById(int id);
    void save(MedicalRecords medicalRecord);
    List<MedicalRecords> getMedicalRecordsByPatientId(int patientId);
}
