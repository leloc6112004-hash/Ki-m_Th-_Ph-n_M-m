package com.vnh.services.impl;

import com.vnh.dto.MedicineRequest;
import com.vnh.dto.PrescriptionRequest;
import com.vnh.pojo.*;
import com.vnh.repositories.*;
import com.vnh.services.PrescriptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Date;

@Service
@Transactional
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionsRepository prescriptionsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordsRepository;

    @Autowired
    private PrescriptionDetailsRepository prescriptionDetailsRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public Prescriptions createPrescription(PrescriptionRequest prescriptionRequest, Principal principal) {
        Users currentUser = userRepository.getUserByUsername(principal.getName());
        if (currentUser == null) throw new UsernameNotFoundException("Không tìm thấy người dùng");
        
        Doctors doctor = currentUser.getDoctors();
        if (doctor == null) throw new IllegalArgumentException("Người dùng không phải là bác sĩ.");

        MedicalRecords medicalRecord = medicalRecordsRepository.getMedicalRecordById(prescriptionRequest.getMedicalRecordId());
        if (medicalRecord == null) throw new IllegalArgumentException("Không tìm thấy hồ sơ bệnh án.");

        Prescriptions prescription = new Prescriptions();
        prescription.setMedicalRecordId(medicalRecord);
        prescription.setDoctorId(doctor);
        prescription.setPrescriptionDate(new Date());

        prescriptionsRepository.savePrescription(prescription);

        for (MedicineRequest medicineRequest : prescriptionRequest.getMedicines()) {
            Medicines medicine = medicineRepository.getMedicineById(medicineRequest.getMedicineId());
            if (medicine != null) {
                PrescriptionDetailsPK detailsPK = new PrescriptionDetailsPK();
                detailsPK.setPrescriptionId(prescription.getId());
                detailsPK.setMedicineId(medicine.getId());

                PrescriptionDetails detail = new PrescriptionDetails();
                detail.setPrescriptionDetailsPK(detailsPK);
                detail.setPrescriptions(prescription);
                detail.setMedicines(medicine);
                
                try {
                    detail.setQuantity(Integer.parseInt(medicineRequest.getDosage()));
                } catch (Exception e) {
                    detail.setQuantity(0);
                }
                
                String instructions = "Tần suất: " + medicineRequest.getFrequency() + ". " + medicineRequest.getInstructions();
                detail.setInstruction(instructions);

                prescriptionDetailsRepository.SavePrescriptionDetails(detail);
            }
        }

        return prescription;
    }

    @Override
    public Prescriptions addPrescription(Prescriptions p) {
        prescriptionsRepository.savePrescription(p);
        return p;
    }
}
