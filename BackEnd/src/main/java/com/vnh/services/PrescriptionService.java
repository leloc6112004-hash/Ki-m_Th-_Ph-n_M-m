/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.services;

import com.vnh.dto.PrescriptionRequest;
import com.vnh.pojo.Prescriptions;
import java.security.Principal;

/**
 *
 * @author Nguyen Hung
 */
public interface PrescriptionService {
    Prescriptions createPrescription(PrescriptionRequest prescriptionRequest, Principal principal);
}
