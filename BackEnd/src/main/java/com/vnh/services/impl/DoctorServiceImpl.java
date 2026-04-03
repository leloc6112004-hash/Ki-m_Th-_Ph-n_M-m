package com.vnh.services.impl;

import com.vnh.pojo.Doctors;
import com.vnh.repositories.DoctorRepository;
import com.vnh.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public List<Doctors> getDoctors() {
        return doctorRepository.getDoctors();
    }

    @Override
    public List<Doctors> getDoctorsBySpecialtyId(int specialtyId) {
        return doctorRepository.getDoctorsBySpecialtyId(specialtyId);
    }

    @Override
    public Doctors getDoctorById(int id) {
        return doctorRepository.getDoctorById(id);
    }

    
}
