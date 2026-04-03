/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.services.impl;

import com.vnh.dto.PatientDto;
import com.vnh.mapper.PatientMapper;

import com.vnh.pojo.Patients;
import com.vnh.pojo.Users;
import com.vnh.repositories.PatientRepository;
import com.vnh.repositories.UserRepository;
import com.vnh.services.PatientService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nguyen Hung
 */
@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Patients getPatientById(int id) {
        return patientRepo.getPatientById(id);
    }

    @Override
    public Patients getPatientByUserId(int userId) {
        return patientRepo.getPatientByUserId(userId);
    }

    @Override
    public Patients addPatient(Patients p) {
        return this.patientRepo.addPatient(p);
    }

    @Override
    public List<Patients> findByDoctorId(int doctorId) {
        return this.patientRepo.findByDoctorId(doctorId);
    }

    @Override
    public PatientDto getPatientByUsername(String username) {
        Users user = userRepository.getUserByUsername(username);

        // Kiểm tra xem người dùng có tồn tại không và có phải là bệnh nhân không
        if (user == null || !user.getRole().equals("PATIENT")) {
            return null;
        }

        // Dùng ID của Users để tìm đối tượng Patients
        Patients patient = patientRepo.getPatientByUserId(user.getId());

        
        return PatientMapper.toPatientDto(patient);
    }

}
