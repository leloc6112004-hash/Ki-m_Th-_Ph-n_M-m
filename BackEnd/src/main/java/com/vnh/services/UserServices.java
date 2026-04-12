/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.services;

import com.vnh.pojo.Users;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Nguyen Hung
 */
public interface UserServices extends UserDetailsService {

    boolean existsByEmail(String email);

    void resetPassword(String email, String newPassword);

    Users getUserByUsername(String username);

    Users addUser(Map<String, String> params, MultipartFile avatar);

    boolean authenticate(String username, String password);

    Users getUserById(int id);

    Users updateUser(int userId, Map<String, String> params, MultipartFile avatarUrl);
}
