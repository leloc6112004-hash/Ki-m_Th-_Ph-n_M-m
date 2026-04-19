package com.vnh.controllers;

import com.vnh.dto.*;
import com.vnh.pojo.Users;
import com.vnh.services.*;
import com.vnh.utils.DtoMapper;
import com.vnh.utils.JwtUtils;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiUserController {

    @Autowired private UserServices userServices;

    @PostMapping(path = "/users", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Users>> create(@RequestParam Map<String, String> params, @RequestParam(value = "avatar") MultipartFile avatar) {
        try {
            Users u = this.userServices.addUser(params, avatar);
            return new ResponseEntity<>(ApiResponse.success(u), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error(500, e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@RequestBody Users u) {
        try {
            if (this.userServices.authenticate(u.getUsername(), u.getPassword())) {
                String token = JwtUtils.generateToken(u.getUsername());
                Users userDetails = this.userServices.getUserByUsername(u.getUsername());
                
                Map<String, Object> data = new HashMap<>();
                data.put("token", token);
                // Trả về dữ liệu cơ bản để tránh lỗi đệ quy
                Map<String, String> userMap = new HashMap<>();
                userMap.put("username", userDetails.getUsername());
                userMap.put("role", userDetails.getRole());
                userMap.put("fullName", userDetails.getFullName());
                data.put("user", userMap);
                
                return ResponseEntity.ok(ApiResponse.success(data));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(401, "Sai tài khoản hoặc mật khẩu"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ApiResponse.error(500, "Lỗi server: " + e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Map<String, String>>> getProfile(Principal principal) {
        if (principal == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        Users user = this.userServices.getUserByUsername(principal.getName());
        Map<String, String> userMap = new HashMap<>();
        userMap.put("username", user.getUsername());
        userMap.put("fullName", user.getFullName());
        userMap.put("role", user.getRole());
        return ResponseEntity.ok(ApiResponse.success(userMap));
    }
}
