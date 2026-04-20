package com.vnh.controllers;

import com.vnh.dto.*;
import com.vnh.pojo.*;
import com.vnh.services.*;
import com.vnh.utils.DtoMapper;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
public class ApiPatientController {

    @Autowired private MedicalRecordService medicalRecordsService;
    @Autowired private AppointmentService appointmentService;
    @Autowired private PatientService patientService;
    @Autowired private UserServices userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<PatientDto>> getMyPatientProfile(Principal principal) {
        if (principal == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        PatientDto patient = patientService.getPatientByUsername(principal.getName());
        if (patient != null) return ResponseEntity.ok(ApiResponse.success(patient));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(404, "Không tìm thấy hồ sơ bệnh nhân"));
    }

    @GetMapping("/{patientId}/medical-records")
    public ResponseEntity<ApiResponse<List<MedicalRecordDTO>>> getMedicalRecords(@PathVariable Integer patientId) {
        List<MedicalRecordDTO> records = medicalRecordsService.getMedicalRecordsByUserId(patientId);
        return ResponseEntity.ok(ApiResponse.success(records));
    }

    @GetMapping("/my-appointments")
    public ResponseEntity<ApiResponse<List<AppointmentDto>>> getMyAppointments(Principal principal) {
        if (principal == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        Users u = userService.getUserByUsername(principal.getName());
        List<Appointments> appointments = appointmentService.getAppointmentsByPatientId(u.getId());
        List<AppointmentDto> dtos = appointments.stream().map(DtoMapper::toAppointmentDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }
}
