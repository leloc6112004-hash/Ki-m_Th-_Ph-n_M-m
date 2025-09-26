/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.services.impl;

import com.vnh.pojo.Notifications;
import com.vnh.pojo.Users;
import com.vnh.repositories.NotificationRepository;
import com.vnh.services.NotificationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nguyen Hung
 */
@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void createNotification(String message, Users user) {
        Notifications notification = new Notifications();
        notification.setMessage(message);
        notification.setUser(user);
        notificationRepository.save(notification);
    }

    @Override
    public List<Notifications> getNotificationsByUser(Users user) {
        return notificationRepository.findByUser(user);
    }
}