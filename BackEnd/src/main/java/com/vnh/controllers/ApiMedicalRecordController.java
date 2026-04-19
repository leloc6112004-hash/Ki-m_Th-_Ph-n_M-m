package com.vnh.controllers;

import com.vnh.dto.ApiResponse;
import com.vnh.dto.MedicalRecordDTO;
import com.vnh.services.MedicalRecordService;
import com.vnh.services.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medical-records") // Đổi gốc để rõ ràng hơn
public class ApiMedicalRecordController {

    @Autowired private MedicalRecordService medicalRecordService;

    // Bác sĩ gửi kết quả khám (Tạo bệnh án)
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createRecord(@RequestBody MedicalRecordDTO recordDto) {
        try {
            medicalRecordService.createMedicalRecord(recordDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Tạo bệnh án thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }
    
    // Đã xóa hàm getPatientRecords ở đây để tránh trùng lặp với ApiPatientController
}
