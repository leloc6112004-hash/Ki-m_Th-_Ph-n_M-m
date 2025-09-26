/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.services.impl;

import com.vnh.pojo.Specialties;
import com.vnh.repositories.SpecialtyRepository;
import com.vnh.services.SpecialtyService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nguyen Hung
 */
@Service
public class SpecialtyServiceImpl implements SpecialtyService{
    @Autowired
    private SpecialtyRepository specRepo;

    @Override
    public List<Specialties> getSpecialties() {
        return specRepo.getSpecialties();
    }
}
