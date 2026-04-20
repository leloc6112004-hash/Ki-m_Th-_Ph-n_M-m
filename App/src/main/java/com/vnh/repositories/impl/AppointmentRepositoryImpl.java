package com.vnh.repositories.impl;

import com.vnh.pojo.Appointments;
import com.vnh.repositories.AppointmentRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import jakarta.persistence.Query;

@Repository
@Transactional
public class AppointmentRepositoryImpl implements AppointmentRepository {

    @Autowired
    private LocalSessionFactoryBean sessionFactory;

    @Override
    public List<Appointments> getAppointments() {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        // Lọc lịch hẹn từ hôm nay trở về sau (Tương lai)
        String hql = "SELECT a FROM Appointments a " +
                     "LEFT JOIN FETCH a.patientId p " +
                     "LEFT JOIN FETCH p.userId " + 
                     "LEFT JOIN FETCH a.doctorId d " +
                     "LEFT JOIN FETCH d.userId " + 
                     "WHERE a.appointmentDate >= CURRENT_DATE " +
                     "ORDER BY a.appointmentDate ASC, a.appointmentTime ASC";
        Query q = session.createQuery(hql, Appointments.class);
        return q.getResultList();
    }

    @Override
    public Appointments getAppointmentById(int id) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        String hql = "SELECT a FROM Appointments a " +
                     "LEFT JOIN FETCH a.patientId p " +
                     "LEFT JOIN FETCH p.userId " +
                     "LEFT JOIN FETCH a.doctorId d " +
                     "LEFT JOIN FETCH d.userId " + 
                     "WHERE a.id = :id";
        return session.createQuery(hql, Appointments.class)
                      .setParameter("id", id)
                      .getSingleResult();
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
        // Bác sĩ cũng chỉ cần xem lịch từ hôm nay trở đi
        String hql = "SELECT a FROM Appointments a " +
                     "JOIN FETCH a.patientId p " +
                     "JOIN FETCH p.userId " + 
                     "WHERE a.doctorId.id = :doctorId AND a.appointmentDate >= CURRENT_DATE " +
                     "ORDER BY a.appointmentDate ASC, a.appointmentTime ASC";
        return session.createQuery(hql, Appointments.class)
                      .setParameter("doctorId", doctorId)
                      .getResultList();
    }

    @Override
    public List<Appointments> findByPatientId_Id(Integer patientId) {
        Session session = this.sessionFactory.getObject().getCurrentSession();
        // Bệnh nhân xem toàn bộ lịch sử (hoặc bạn có thể lọc tương tự nếu muốn)
        String hql = "SELECT a FROM Appointments a " +
                     "JOIN FETCH a.doctorId d " +
                     "JOIN FETCH d.userId " + 
                     "WHERE a.patientId.id = :patientId " +
                     "ORDER BY a.appointmentDate DESC";
        return session.createQuery(hql, Appointments.class)
                      .setParameter("patientId", patientId)
                      .getResultList();
    }
}
