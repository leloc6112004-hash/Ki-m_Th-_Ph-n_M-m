/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.repositories.impl;

import com.vnh.pojo.MedicalRecords;
import com.vnh.pojo.Patients;
import com.vnh.repositories.PatientRepository;

import org.hibernate.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.hibernate.query.Query;

/**
 *
 * @author Nguyen Hung
 */
@Repository
@Transactional
public class PatientRepositoryImpl implements PatientRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;

    @Override
    public Patients getPatientById(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        return session.find(Patients.class, id);
    }

    @Override
    public Patients getPatientByUserId(int userId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        Query q = session.createQuery("FROM Patients p WHERE p.userId.id = :userId", Patients.class);

        q.setParameter("userId", userId);

        // Sử dụng getResultList() để xử lý cả trường hợp không có kết quả và nhiều hơn một kết quả
        List<Patients> results = q.getResultList();

        if (results.isEmpty()) {
            // Trả về null nếu không tìm thấy bệnh nhân nào
            return null;
        } else {
            // Trả về bệnh nhân đầu tiên, giả định rằng userId là duy nhất
            return results.get(0);
        }
    }

    @Override
    public Patients addPatient(Patients p) {
        Session s = this.sessionFactory.getObject().getCurrentSession();
        s.persist(p);

        return p;
    }

    @Override
    public List<Patients> findByDoctorId(int doctorId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();

        // Sửa lại truy vấn HQL để sử dụng đúng tên thuộc tính là `patientId` và `doctorId`
        Query<Patients> query = session.createQuery(
                "SELECT DISTINCT p FROM Appointments a JOIN a.patientId p JOIN FETCH p.userId WHERE a.doctorId.id = :doctorId", Patients.class);
        query.setParameter("doctorId", doctorId);

        return query.getResultList();
    }

}
