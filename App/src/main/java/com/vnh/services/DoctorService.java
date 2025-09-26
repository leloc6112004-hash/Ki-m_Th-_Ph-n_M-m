/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.services;

import com.vnh.pojo.Doctors;
import java.util.List;

/**
 *
 * @author Nguyen Hung
 */
public interface DoctorService {

    List<Doctors> getDoctors();

    List<Doctors> getDoctorsBySpecialtyId(int specialtyId);

    Doctors getDoctorById(int id);
    
    
}
