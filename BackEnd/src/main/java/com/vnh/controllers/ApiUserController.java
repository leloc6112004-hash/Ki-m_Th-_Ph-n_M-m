/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.controllers;

import com.vnh.dto.PatientDto;
import com.vnh.dto.UserDto;
import com.vnh.mapper.PatientMapper;
import com.vnh.mapper.UserMapper;
import com.vnh.pojo.MedicalRecords;
import com.vnh.pojo.Patients;
import com.vnh.pojo.Users;
import com.vnh.services.MedicalRecordService;
import com.vnh.services.PatientService;
import com.vnh.services.UserServices;
import com.vnh.utils.JwtUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.security.Principal;
import java.util.Collections;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author Nguyen Hung
 */
@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiUserController {

    @Autowired
    private UserServices userDetailsService;
    @Autowired
    private MedicalRecordService medicalRecordService;
    @Autowired
    private PatientService patientService;
    
    @PostMapping(path = "/users",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> create(@RequestParam Map<String, String> params, @RequestParam(value = "avatar") MultipartFile avatar) {
        return new ResponseEntity<>(this.userDetailsService.addUser(params, avatar), HttpStatus.CREATED);
    }
    
     @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users u) {
        if (this.userDetailsService.authenticate(u.getUsername(), u.getPassword())) {
            try {
                String token = JwtUtils.generateToken(u.getUsername());
                Users userDetails = this.userDetailsService.getUserByUsername(u.getUsername());

                // Bước 1: Tạo DTO cơ bản từ đối tượng Users
                UserDto userDto = UserMapper.toUserDto(userDetails);

                // Bước 2: KIỂM TRA VÀ LẤY THÔNG TIN BỆNH NHÂN
                if ("PATIENT".equals(userDetails.getRole())) {
                    Patients patientEntity = this.patientService.getPatientByUserId(userDetails.getId());
                    if (patientEntity != null) {
                        // Bước 3: Ánh xạ từ Patients entity sang PatientDto
                        PatientDto patientDto = PatientMapper.toPatientDto(patientEntity);

                        // Bước 4: Gán PatientDto vào UserDto
                        userDto.setPatient(patientDto);
                    }
                }

                // Bước 5: Tạo phản hồi cuối cùng
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", userDto);

                return ResponseEntity.ok().body(response);
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Lỗi khi tạo JWT: " + e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai thông tin đăng nhập");
    }
    
     @GetMapping("/secure/profile")
    public ResponseEntity<Users> getProfile(Principal principal) {
        if (principal == null || principal.getName() == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Users user = this.userDetailsService.getUserByUsername(principal.getName());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    @PatchMapping(path = "/users/{userId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> updateUserProfile(
            @PathVariable int userId,
            @RequestParam Map<String, String> params,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {

        Users updatedUser = this.userDetailsService.updateUser(userId, params, avatar);

        if (updatedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

}
