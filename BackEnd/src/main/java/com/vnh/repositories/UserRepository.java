/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.repositories;

import com.vnh.pojo.Users;
import java.util.Map;
import java.util.Optional;

/**
 *
 * @author Nguyen Hung
 */
public interface UserRepository {

    Users getUserByUsername(String username);

    Users addUser(Users u);

    boolean authenticate(String username, String password);

    Users getUserById(int id);

    Users updateUser(Users user);

    Users findByEmail(String email);

    void update(Users user);

}
