/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.vnh.repositories;

import com.vnh.pojo.Users;
import java.util.List;
import com.vnh.pojo.Notifications;


/**
 *
 * @author Nguyen Hung
 */
public interface NotificationRepository {
    List<Notifications> findByUser(Users user);
    public Notifications save(Notifications notification);
}
