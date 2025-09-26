/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.repositories.impl;

import com.vnh.pojo.Appointments;
import com.vnh.repositories.AppointmentRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import java.util.List;
import jakarta.persistence.Query;

/**
 *
 * @author Nguyen Hung
 */
@Repository
public class AppointmentRepositoryImpl implements AppointmentRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;

    @Override
    public List<Appointments> getAppointments() {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM Appointments", Appointments.class);
        return q.getResultList();
    }

    @Override
    public Appointments getAppointmentById(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        return session.find(Appointments.class, id);
    }

    @Override
    public void saveAppointment(Appointments appointment) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        if (appointment.getId() == null) {
            session.persist(appointment);
        } else {
            session.merge(appointment);
        }
    }

    @Override
    public List<Appointments> findByDoctorId_Id(Integer doctorId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM Appointments WHERE doctorId.id = :doctorId", Appointments.class);
        q.setParameter("doctorId", doctorId);
        return q.getResultList();
    }

    @Override
    public List<Appointments> findByPatientId_Id(Integer patientId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM Appointments WHERE patientId.id = :patientId", Appointments.class);
        q.setParameter("patientId", patientId);
        return q.getResultList();
    }
}
