/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.repositories;

/**
 *
 * @author Nguyen Hung
 */
import com.vnh.pojo.Doctors;
import java.util.List;

public interface DoctorRepository {

    List<Doctors> getDoctors();

    List<Doctors> getDoctorsBySpecialtyId(int specialtyId);

    Doctors getDoctorById(int id);
}
