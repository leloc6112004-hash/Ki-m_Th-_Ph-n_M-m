/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.repositories.impl;

import com.vnh.pojo.Medicines;
import com.vnh.repositories.MedicineRepository;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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
public class MedicineRepositoryImpl implements MedicineRepository {

    private static final int PAGE_SIZE = 6;
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<Medicines> getMedicines(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Medicines> q = b.createQuery(Medicines.class);
        Root root = q.from(Medicines.class);
        q.select(root);

        List<Predicate> predicates = new ArrayList<>();

        if (params != null) {
            // Lọc theo tên thuốc (keyword)
            String kw = params.get("kw");
            if (kw != null && !kw.isEmpty()) {
                predicates.add(b.like(root.get("name"), String.format("%%%s%%", kw)));
            }

            // Lọc theo giá
            String fromPrice = params.get("fromPrice");
            if (fromPrice != null && !fromPrice.isEmpty()) {
                predicates.add(b.greaterThanOrEqualTo(root.get("price"), fromPrice));
            }

            String toPrice = params.get("toPrice");
            if (toPrice != null && !toPrice.isEmpty()) {
                predicates.add(b.lessThanOrEqualTo(root.get("price"), toPrice));
            }

        }

        q.where(predicates.toArray(new Predicate[0]));
        q.orderBy(b.desc(root.get("id")));

        // Phân trang
        Query query = s.createQuery(q);
        if (params != null && params.containsKey("page")) {
            int page = Integer.parseInt(params.get("page"));
            int start = (page - 1) * PAGE_SIZE;

            query.setMaxResults(PAGE_SIZE);
            query.setFirstResult(start);
        }

        return query.getResultList();

    }

    @Override
    public Medicines getMedicineById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.find(Medicines.class, id);
    }

    @Override
    public Medicines addOrUpdateMedicine(Medicines medicine) {
        Session s = this.factory.getObject().getCurrentSession();
        if (medicine.getId() == null) {
            s.persist(medicine);
        } else {
            s.merge(medicine);
        }

        return medicine;
    }

    @Override
    public void deleteMedicine(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        Medicines p = this.getMedicineById(id);

        if (p != null) {
            s.remove(p);
        } else {

            System.err.println("Không tìm thấy thuốc với ID: " + id);
        }
    }

    @Override
    public List<Medicines> getExpiringMedicines(int daysThreshold) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Medicines> q = b.createQuery(Medicines.class);
        Root<Medicines> root = q.from(Medicines.class);

        // Tính ngày giới hạn: hôm nay + daysThreshold
        long millisInDay = TimeUnit.DAYS.toMillis(1);
        Date today = new Date();
        Date thresholdDate = new Date(today.getTime() + (long) daysThreshold * millisInDay);

        // Tạo điều kiện lọc
        Predicate isExpiringSoon = b.lessThanOrEqualTo(root.get("expiryDate"), thresholdDate);
        Predicate notExpiredYet = b.greaterThanOrEqualTo(root.get("expiryDate"), today);

        // Kết hợp các điều kiện
        q.select(root).where(isExpiringSoon, notExpiredYet);

        // Thực hiện truy vấn
        return s.createQuery(q).getResultList();
    }

    @Override
    public List<Medicines> getLowStockMedicines(int stockThreshold) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Medicines> q = b.createQuery(Medicines.class);
        Root<Medicines> root = q.from(Medicines.class);

        Predicate lowStock = b.lessThanOrEqualTo(root.get("stockQuantity"), stockThreshold);

        q.select(root).where(lowStock);

        return s.createQuery(q).getResultList();
    }

}
