package com.vnh.controllers;

import com.vnh.pojo.Appointments;
import com.vnh.pojo.Doctors;
import com.vnh.pojo.Patients;
import com.vnh.payload.AppointmentRequest; // Import DTO mới
import com.vnh.services.AppointmentService;
import com.vnh.services.DoctorService;
import com.vnh.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;

@RestController
@RequestMapping("/api")
public class ApiAppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private PatientService patientService;

    @PostMapping("/appointments")
    public ResponseEntity<Appointments> createAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        try {
          
            Doctors doctor = doctorService.getDoctorById(appointmentRequest.getDoctorId());
            Patients patient = patientService.getPatientById(appointmentRequest.getPatientId());

            if (doctor == null || patient == null) {
                
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            
            Appointments newAppointment = new Appointments();
            newAppointment.setDoctorId(doctor);
            newAppointment.setPatientId(patient);
            newAppointment.setReason(appointmentRequest.getReason());
            newAppointment.setAppointmentDate(appointmentRequest.getAppointmentDate());
            newAppointment.setAppointmentTime(appointmentRequest.getAppointmentTime());
            newAppointment.setStatus("pending");
            newAppointment.setCreatedAt(new Date());

           
            appointmentService.saveAppointment(newAppointment);

            return new ResponseEntity<>(newAppointment, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
