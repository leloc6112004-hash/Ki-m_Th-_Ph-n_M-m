/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.repositories.impl;

import com.vnh.pojo.MedicalRecords;
import com.vnh.repositories.MedicalRecordRepository;
import org.hibernate.query.Query;
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
public class MedicalRecordRepositoryImpl implements MedicalRecordRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<MedicalRecords> findByPatientId(int patientId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM MedicalRecords mr WHERE mr.patientId.id = :patientId", MedicalRecords.class);
        q.setParameter("patientId", patientId);
        return q.getResultList();
    }

    @Override
    public MedicalRecords getMedicalRecordById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.find(MedicalRecords.class, id);
    }

    @Override
    public void save(MedicalRecords medicalRecord) {
        Session s = this.factory.getObject().getCurrentSession();
        s.merge(medicalRecord);
    }

    @Override
    public List<MedicalRecords> getMedicalRecordsByPatientId(int patientId) {
        Session s = this.factory.getObject().getCurrentSession();

       
        Query<MedicalRecords> q = s.createQuery("FROM MedicalRecords mr WHERE mr.patientId.id = :patientId", MedicalRecords.class);

        // Đặt giá trị cho tham số truy vấn
        q.setParameter("patientId", patientId);

        // Thực thi truy vấn và trả về danh sách kết quả
        return q.getResultList();
    }
}
