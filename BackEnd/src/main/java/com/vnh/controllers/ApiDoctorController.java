package com.vnh.controllers;



import com.vnh.dto.DoctorAppointmentDto;
import com.vnh.dto.MedicalRecordDTO;
import com.vnh.pojo.Appointments;
import com.vnh.pojo.Doctors;
import com.vnh.pojo.MedicalRecords;
import com.vnh.pojo.Patients;
import com.vnh.pojo.Specialties;
import com.vnh.pojo.Users;
import com.vnh.services.AppointmentService;
import com.vnh.services.DoctorService;
import com.vnh.services.MedicalRecordService;
import com.vnh.services.NotificationService;
import com.vnh.services.PatientService;
import com.vnh.services.SpecialtyService;
import com.vnh.services.UserServices;
import jakarta.servlet.http.HttpSession;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class ApiDoctorController {
    private static final Logger logger = LoggerFactory.getLogger(ApiDoctorController.class);

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private SpecialtyService specialtyService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserServices userService;

    @Autowired
    private PatientService patientService;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private MedicalRecordService medicalRecordService;

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctors>> getDoctors(@RequestParam(required = false) Integer specialtyId) {
        if (specialtyId != null) {
            List<Doctors> filteredDoctors = doctorService.getDoctorsBySpecialtyId(specialtyId);
            return new ResponseEntity<>(filteredDoctors, HttpStatus.OK);
        }
        return new ResponseEntity<>(doctorService.getDoctors(), HttpStatus.OK);
    }

    @GetMapping("/specialties")
    public ResponseEntity<List<Specialties>> getSpecialties() {
        return new ResponseEntity<>(specialtyService.getSpecialties(), HttpStatus.OK);
    }

    @GetMapping("/doctors/my-appointments")
    public ResponseEntity<List<DoctorAppointmentDto>> getMyAppointments(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vui lòng đăng nhập.");
        }

       
        String username = principal.getName();
        Users user = userService.getUserByUsername(username);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Tài khoản không tồn tại.");
        }

       
        if (!user.getRole().equals("DOCTOR")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không có quyền truy cập.");
        }

       
        Doctors doctor = doctorService.getDoctorById(user.getId());

        if (doctor == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin bác sĩ liên kết.");
        }

        List<DoctorAppointmentDto> appointments = appointmentService.getAppointmentsByDoctorId(doctor.getId());

        if (appointments == null || appointments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/doctors/patients")
    public ResponseEntity<List<Patients>> getDoctorPatients(Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String username = principal.getName();
        Users user = userService.getUserByUsername(username);

        if (user == null || !user.getRole().equals("DOCTOR")) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Doctors doctor = doctorService.getDoctorById(user.getId());

        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Patients> patients = patientService.findByDoctorId(doctor.getId());

        if (patients == null || patients.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @PutMapping("/doctors/appointments/{appointmentId}/confirm")
    public ResponseEntity<String> confirmAppointment(@PathVariable Integer appointmentId, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Vui lòng đăng nhập.");
        }

        try {
           
            Appointments appointment = appointmentService.getAppointmentById(appointmentId);

            if (appointment == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy lịch hẹn.");
            }

         
            appointment.setStatus("Đã xác nhận");
            appointmentService.saveAppointment(appointment);

           
            Users patientUser = appointment.getPatientId().getUserId();

            // Tạo nội dung thông báo
            String message = String.format("Lịch hẹn của bạn vào ngày %s lúc %s đã được bác sĩ xác nhận.",
                    appointment.getAppointmentDate(),
                    appointment.getAppointmentTime());

           
            notificationService.createNotification(message, patientUser);

            return ResponseEntity.ok("Xác nhận thành công.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi xác nhận lịch hẹn.");
        }
    }

    @PostMapping("/medical-records")
    public ResponseEntity<String> createMedicalRecord(@RequestBody MedicalRecordDTO medicalRecordDto, Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Vui lòng đăng nhập.");
        }

        String username = principal.getName();
        Users user = userService.getUserByUsername(username);

        if (user == null || !user.getRole().equals("DOCTOR")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập.");
        }

        try {
            medicalRecordService.createMedicalRecord(medicalRecordDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Hồ sơ bệnh án đã được tạo thành công.");
        } catch (IllegalArgumentException e) {
            // Log lỗi cụ thể
            logger.error("Lỗi dữ liệu đầu vào: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            
            logger.error("Đã xảy ra lỗi khi tạo hồ sơ bệnh án.", e); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi tạo hồ sơ bệnh án.");
        }
    }
    @GetMapping("/medical-records/by-patient/{patientId}")
    public ResponseEntity<List<MedicalRecords>> getMedicalRecordsByPatientId(@PathVariable int patientId) {
        List<MedicalRecords> medicalRecords = medicalRecordService.getMedicalRecordsByPatientId(patientId);

        if (medicalRecords.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(medicalRecords, HttpStatus.OK);
    }

}
