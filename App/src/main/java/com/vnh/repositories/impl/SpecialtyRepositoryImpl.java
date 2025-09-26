/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.repositories.impl;

import com.vnh.pojo.Specialties;
import com.vnh.repositories.SpecialtyRepository;
import jakarta.persistence.Query;
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
public class SpecialtyRepositoryImpl implements SpecialtyRepository{
    @Autowired
    private LocalSessionFactoryBean sessionFactory;

    @Override
    public List<Specialties> getSpecialties() {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM Specialties", Specialties.class);
        return q.getResultList();
    }
}
