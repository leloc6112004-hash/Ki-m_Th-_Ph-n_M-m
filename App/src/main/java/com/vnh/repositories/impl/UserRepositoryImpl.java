/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.repositories.impl;

import com.vnh.pojo.Users;
import com.vnh.repositories.UserRepository;
import jakarta.persistence.Query;
import java.util.Map;
import java.util.Optional;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import java.util.List;

/**
 *
 * @author Nguyen Hung
 */
@Repository
@Transactional
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Users getUserByUsername(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Users.findByUsername", Users.class);
        q.setParameter("username", username);

        // Sử dụng getResultList() để tránh NoResultException
        List<Users> users = q.getResultList();

        // Kiểm tra nếu danh sách không rỗng và trả về người dùng đầu tiên
        if (!users.isEmpty()) {
            return users.get(0);
        } else {
            // Trả về null nếu không tìm thấy người dùng
            return null;
        }
    }

    @Override
    public Users addUser(Users u) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(u);

        return u;
    }

    @Override
    public boolean authenticate(String username, String password) {
        Users u = this.getUserByUsername(username);

        return this.passwordEncoder.matches(password, u.getPassword());
    }

    @Override
    public Users getUserById(int id) {
        Session session = this.factory.getObject().getCurrentSession();
        return session.find(Users.class, id);
    }

    @Override
    public Users updateUser(Users user) {
        Session s = this.factory.getObject().getCurrentSession();
        s.merge(user);

        return user;
    }

}
