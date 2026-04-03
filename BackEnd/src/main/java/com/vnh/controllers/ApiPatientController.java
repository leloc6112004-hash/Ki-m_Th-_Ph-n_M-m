package com.vnh.controllers;

import com.vnh.dto.MedicalRecordDTO;
import com.vnh.dto.PatientDto;
import com.vnh.pojo.Appointments;
import com.vnh.pojo.Notifications;
import com.vnh.pojo.Users;
import com.vnh.services.AppointmentService;

import com.vnh.services.MedicalRecordService;
import com.vnh.services.NotificationService;
import com.vnh.services.PatientService;
import com.vnh.services.UserServices;
import jakarta.servlet.http.HttpSession;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class ApiPatientController {

    @Autowired
    private MedicalRecordService medicalRecordsService;
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserServices userService;
    @Autowired
    private PatientService patientService;

    @GetMapping("/patients/me")
    public ResponseEntity<PatientDto> getMyPatientProfile(Principal principal) {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (principal == null || principal.getName() == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Gọi service để lấy thông tin bệnh nhân
        PatientDto patient = patientService.getPatientByUsername(principal.getName());

        if (patient == null) {
            // Trả về 404 Not Found nếu người dùng không có hồ sơ bệnh nhân
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping("/patients/{patientId}/medical-records")
    public ResponseEntity<List<MedicalRecordDTO>> getMedicalRecords(@PathVariable Integer patientId) {
        List<MedicalRecordDTO> records = medicalRecordsService.getMedicalRecordsByUserId(patientId);
        if (records.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(records);
    }

    @GetMapping("/patients/my-appointments")
    public ResponseEntity<List<Appointments>> getMyAppointments(HttpSession session) {
        Object patientIdObject = session.getAttribute("patientId");

        if (patientIdObject == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vui lòng đăng nhập để xem lịch hẹn.");
        }

        try {
            Integer patientId = (Integer) patientIdObject;
            List<Appointments> appointments = appointmentService.getAppointmentsByPatientId(patientId);

            if (appointments == null || appointments.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(appointments);
        } catch (ClassCastException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Dữ liệu session không hợp lệ.");
        }
    }

    @GetMapping("/patients/my-notifications")
    public ResponseEntity<List<Notifications>> getPatientNotifications(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vui lòng đăng nhập để xem thông báo.");
        }

        // Lấy tên người dùng từ JWT
        String username = principal.getName();
        Users user = userService.getUserByUsername(username);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Tài khoản không tồn tại.");
        }

        // Lấy danh sách thông báo của người dùng
        List<Notifications> notifications = notificationService.getNotificationsByUser(user);

        if (notifications.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(notifications);
    }
}
