package com.vnh.services.impl;

import com.vnh.dto.PatientDto;
import com.vnh.pojo.Patients;
import com.vnh.pojo.Users;
import com.vnh.repositories.PatientRepository;
import com.vnh.repositories.UserRepository;
import com.vnh.services.PatientService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepo;
    
    @Autowired
    private UserRepository userRepo;

    @Override
    public List<Patients> getPatients() {
        return patientRepo.getPatients();
    }

    @Override
    public Patients getPatientById(int id) {
        return patientRepo.getPatientById(id);
    }

    @Override
    public void addPatient(Patients p) {
        patientRepo.addPatient(p);
    }

    @Override
    public List<Patients> findByDoctorId(int doctorId) {
        return patientRepo.findByDoctorId(doctorId);
    }

    @Override
    public Patients getPatientByUserId(int userId) {
        return patientRepo.getPatientByUserId(userId);
    }

    @Override
    public PatientDto getPatientByUsername(String username) {
        Users user = userRepo.getUserByUsername(username);
        if (user != null) {
            Patients p = patientRepo.getPatientByUserId(user.getId());
            if (p != null) {
                return PatientDto.builder()
                        .id(p.getId())
                        .fullName(user.getFullName())
                        .patientCode(p.getPatientCode())
                        .build();
            }
        }
        return null;
    }
}
