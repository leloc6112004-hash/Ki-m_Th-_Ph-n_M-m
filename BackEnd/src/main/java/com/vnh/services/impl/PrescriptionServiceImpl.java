package com.vnh.services.impl;

import com.vnh.dto.MedicineRequest;
import com.vnh.dto.PrescriptionRequest;
import com.vnh.pojo.*;
import com.vnh.repositories.*;
import com.vnh.services.PrescriptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Thêm import này

import java.security.Principal;
import java.util.Date;

@Service
@Transactional // Thêm annotation này để quản lý giao dịch
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

        // 1. Tìm người dùng và bác sĩ
        Users currentUser = userRepository.getUserByUsername(principal.getName());
        if (currentUser == null) {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
        Doctors doctor = currentUser.getDoctors();
        if (doctor == null) {
            throw new IllegalArgumentException("Người dùng không phải là bác sĩ.");
        }

        // 2. Tìm hồ sơ bệnh án
        MedicalRecords medicalRecord = medicalRecordsRepository.getMedicalRecordById(prescriptionRequest.getMedicalRecordId());
        if (medicalRecord == null) {
            throw new IllegalArgumentException("Không tìm thấy hồ sơ bệnh án với ID: " + prescriptionRequest.getMedicalRecordId());
        }

        // 3. Tạo và lưu đơn thuốc chính (Prescriptions)
        Prescriptions prescription = new Prescriptions();
        prescription.setMedicalRecordId(medicalRecord);
        prescription.setDoctorId(doctor);
        prescription.setPrescriptionDate(new Date());

        // Phương thức `savePrescription` phải trả về đối tượng đã được gán ID
        // hoặc logic lưu phải đảm bảo đối tượng 'prescription' có ID sau khi gọi
        prescriptionsRepository.savePrescription(prescription); // Giả sử phương thức save() được đặt tên chuẩn

        // 4. Tạo và lưu chi tiết đơn thuốc (PrescriptionDetails)
        for (MedicineRequest medicineRequest : prescriptionRequest.getMedicines()) {
            Medicines medicine = medicineRepository.getMedicineById(medicineRequest.getMedicineId());
            if (medicine == null) {
                throw new IllegalArgumentException("Không tìm thấy thuốc với ID: " + medicineRequest.getMedicineId());
            }

            // TẠO KHÓA CHÍNH PHỨC HỢP TRƯỚC
            PrescriptionDetailsPK detailsPK = new PrescriptionDetailsPK();
            detailsPK.setPrescriptionId(prescription.getId()); // Lấy ID của đơn thuốc đã được tạo
            detailsPK.setMedicineId(medicine.getId()); // Lấy ID của thuốc

            PrescriptionDetails detail = new PrescriptionDetails();
            detail.setPrescriptionDetailsPK(detailsPK); // GÁN KHÓA CHÍNH VÀO ĐỐI TƯỢNG

            // Gán các đối tượng cha
            detail.setPrescriptions(prescription);
            detail.setMedicines(medicine);

            // Xử lý logic ánh xạ dữ liệu từ DTO sang POJO
            try {
                detail.setQuantity(Integer.parseInt(medicineRequest.getDosage()));
            } catch (NumberFormatException e) {
                detail.setQuantity(0);
            }
            String instructions = "Tần suất: " + medicineRequest.getFrequency() + ". " + medicineRequest.getInstructions();
            detail.setInstruction(instructions);

            prescriptionDetailsRepository.SavePrescriptionDetails(detail); // Giả sử phương thức save()
        }

        return prescription;
    }
}
