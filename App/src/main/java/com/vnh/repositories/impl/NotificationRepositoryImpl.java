/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.repositories.impl;

import com.vnh.pojo.Notifications;
import com.vnh.pojo.Users;
import com.vnh.repositories.NotificationRepository;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nguyen Hung
 */
@Repository
@Transactional
public class NotificationRepositoryImpl implements NotificationRepository {

    @Autowired
    private LocalSessionFactoryBean Factory;

    @Override
    public List<Notifications> findByUser(Users user) {
        Session session = this.Factory.getObject().getCurrentSession();
        return session.createQuery("FROM Notifications WHERE user = :user", Notifications.class)
                      .setParameter("user", user)
                      .getResultList();
    }

    @Override
    public Notifications save(Notifications notification) {
        Session session = this.Factory.getObject().getCurrentSession();
         session.persist(notification);
        return notification;
    }

   
}