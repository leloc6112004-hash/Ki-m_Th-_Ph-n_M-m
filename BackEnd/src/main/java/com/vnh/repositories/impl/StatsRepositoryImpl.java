/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.repositories.impl;

import com.vnh.pojo.Appointments;
import com.vnh.pojo.BillDetails;
import com.vnh.pojo.Bills;
import com.vnh.pojo.Doctors;
import com.vnh.pojo.MedicalRecords;
import com.vnh.pojo.Patients;
import com.vnh.pojo.Services;
import com.vnh.pojo.Specialties;
import com.vnh.pojo.Users;
import com.vnh.repositories.StatsRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
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
public class StatsRepositoryImpl implements StatsRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<Object[]> countPatientsByGender() {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = b.createQuery(Object[].class);

        // Gốc truy vấn từ Patients
        Root patientRoot = query.from(Patients.class);
        // Nối từ Patients tới Users để lấy giới tính
        Join<Patients, Users> userJoin = patientRoot.join("userId");

        query.select(b.array(userJoin.get("gender"), b.count(patientRoot.get("id"))));
        query.groupBy(userJoin.get("gender"));

        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public List<Object[]> countPatientsByAgeGroup() {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = b.createQuery(Object[].class);

        Root<Patients> patientRoot = query.from(Patients.class);
        Join userJoin = patientRoot.join("userId");

        // Tạo biểu thức CASE cho nhóm tuổi
        Expression<Object> ageGroup = b.selectCase()
                .when(b.le(b.function("YEAR", Integer.class, userJoin.get("dateOfBirth")), b.literal(18)), "Dưới 18 tuổi")
                .when(b.and(b.ge(b.function("YEAR", Integer.class, userJoin.get("dateOfBirth")), b.literal(18)),
                        b.le(b.function("YEAR", Integer.class, userJoin.get("dateOfBirth")), b.literal(30))), "18-30 tuổi")
                .otherwise("Trên 30 tuổi");

        // Lựa chọn các cột
        query.select(b.array(
                // Cột 1: Nhóm tuổi (biểu thức CASE)
                ageGroup,
                // Cột 2: Số lượng bệnh nhân
                b.count(patientRoot.get("id"))
        ));

        // Nhóm theo chính biểu thức CASE đã tạo
        query.groupBy(ageGroup);

        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public List<Object[]> countPatientsBySpecialty() {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = b.createQuery(Object[].class);
        Root appointmentRoot = query.from(Appointments.class);

        // Nối từ Appointments tới Doctors
        Join<Appointments, Doctors> doctorJoin = appointmentRoot.join("doctorId");

        Join<Doctors, Specialties> specialtyJoin = doctorJoin.join("specialtyId");

        query.select(b.array(specialtyJoin.get("name"), b.count(appointmentRoot.get("id"))));
        query.groupBy(specialtyJoin.get("name"));

        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public List<Object[]> countServicesUsed() {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = b.createQuery(Object[].class);

        // Gốc truy vấn là BillDetails
        Root billDetailsRoot = query.from(BillDetails.class);

        // Nối từ BillDetails tới Services
        Join<BillDetails, Services> servicesJoin = billDetailsRoot.join("services");

        query.select(b.array(servicesJoin.get("name"), b.count(billDetailsRoot.get("id"))));
        query.groupBy(servicesJoin.get("name"));

        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public List<Object[]> countPopularDiseases() {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = b.createQuery(Object[].class);

        // Gốc truy vấn là MedicalRecords
        Root medicalRecordRoot = query.from(MedicalRecords.class);

        // Chọn tên chẩn đoán và đếm số lần xuất hiện
        query.select(b.array(medicalRecordRoot.get("diagnosis"), b.count(medicalRecordRoot.get("id"))));

        // Nhóm kết quả theo tên chẩn đoán
        query.groupBy(medicalRecordRoot.get("diagnosis"));

        // Sắp xếp kết quả theo thứ tự giảm dần của số lượng
        query.orderBy(b.desc(b.count(medicalRecordRoot.get("id"))));

        Query q = s.createQuery(query);
        return q.getResultList();
    }

    @Override
    public List<Object[]> getRevenueByTime(String time, int year) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = b.createQuery(Object[].class);

        // Bắt đầu truy vấn từ bảng chi tiết hóa đơn
        Root<BillDetails> billDetailsRoot = query.from(BillDetails.class);

        // Nối từ chi tiết hóa đơn đến hóa đơn chính để lấy ngày tạo
        Join<BillDetails, Bills> billsJoin = billDetailsRoot.join("bills");

        // Lựa chọn các cột
        query.select(b.array(
                // Cột 1: Đơn vị thời gian (ví dụ: tháng, quý)
                b.function(time, Integer.class, billsJoin.get("billDate")),
                // Cột 2: Tổng doanh thu của đơn vị thời gian đó
                b.sum(billDetailsRoot.get("amount"))
        ));

        // Lọc theo năm
        query.where(b.equal(
                b.function("YEAR", Integer.class, billsJoin.get("billDate")), year
        ));

        // Nhóm các bản ghi theo đơn vị thời gian
        query.groupBy(b.function(time, Integer.class, billsJoin.get("billDate")));

        // Sắp xếp theo đơn vị thời gian
        query.orderBy(b.asc(b.function(time, Integer.class, billsJoin.get("billDate"))));

        Query q = s.createQuery(query);
        return q.getResultList();
    }

}
