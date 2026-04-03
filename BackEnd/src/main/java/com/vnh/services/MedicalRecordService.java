/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.services;

import com.vnh.dto.MedicalRecordDTO;
import com.vnh.pojo.MedicalRecords;
import java.util.List;

/**
 *
 * @author Nguyen Hung
 */
public interface MedicalRecordService {

    List<MedicalRecordDTO> getMedicalRecordsByUserId(int userId);

    void createMedicalRecord(MedicalRecordDTO medicalRecordDto);

    List<MedicalRecords> getMedicalRecordsByPatientId(int patientId);
}
