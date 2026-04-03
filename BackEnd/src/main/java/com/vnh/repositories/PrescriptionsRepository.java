/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.repositories;

import com.vnh.pojo.Prescriptions;

/**
 *
 * @author Nguyen Hung
 */
public interface PrescriptionsRepository {

    void savePrescription(Prescriptions prescription);

    Prescriptions getPrescriptionById(int id);
}
