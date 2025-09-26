/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 *
 * @author Nguyen Hung
 */
@Entity
@Table(name = "appointments")
@NamedQueries({
    @NamedQuery(name = "Appointments.findAll", query = "SELECT a FROM Appointments a"),
    @NamedQuery(name = "Appointments.findById", query = "SELECT a FROM Appointments a WHERE a.id = :id"),
    @NamedQuery(name = "Appointments.findByAppointmentDate", query = "SELECT a FROM Appointments a WHERE a.appointmentDate = :appointmentDate"),
    @NamedQuery(name = "Appointments.findByAppointmentTime", query = "SELECT a FROM Appointments a WHERE a.appointmentTime = :appointmentTime"),
    @NamedQuery(name = "Appointments.findByReason", query = "SELECT a FROM Appointments a WHERE a.reason = :reason"),
    @NamedQuery(name = "Appointments.findByStatus", query = "SELECT a FROM Appointments a WHERE a.status = :status"),
    @NamedQuery(name = "Appointments.findByCreatedAt", query = "SELECT a FROM Appointments a WHERE a.createdAt = :createdAt")})
public class Appointments implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "appointment_date")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date appointmentDate;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "appointment_time")
    @Temporal(TemporalType.TIME)
    @JsonFormat(pattern = "HH:mm")
    private Date appointmentTime;
    
    @Size(max = 255)
    @Column(name = "reason")
    private String reason;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "status")
    private String status;
    @Basic(optional = false)
    @NotNull
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    @JoinColumn(name = "doctor_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    @JsonIgnore
    private Doctors doctorId;
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    @JsonIgnore
    private Patients patientId;
    @OneToMany(mappedBy = "appointmentId")
    @JsonIgnore
    private Collection<MedicalRecords> medicalRecordsCollection;
    @OneToMany(mappedBy = "appointmentId")
    @JsonIgnore
    private Collection<Bills> billsCollection;

    public Appointments() {
    }

    public Appointments(Integer id) {
        this.id = id;
    }

    public Appointments(Integer id, Date appointmentDate, Date appointmentTime, String status, Date createdAt) {
        this.id = id;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public Date getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(Date appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Doctors getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Doctors doctorId) {
        this.doctorId = doctorId;
    }

    public Patients getPatientId() {
        return patientId;
    }

    public void setPatientId(Patients patientId) {
        this.patientId = patientId;
    }

    public Collection<MedicalRecords> getMedicalRecordsCollection() {
        return medicalRecordsCollection;
    }

    public void setMedicalRecordsCollection(Collection<MedicalRecords> medicalRecordsCollection) {
        this.medicalRecordsCollection = medicalRecordsCollection;
    }

    public Collection<Bills> getBillsCollection() {
        return billsCollection;
    }

    public void setBillsCollection(Collection<Bills> billsCollection) {
        this.billsCollection = billsCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Appointments)) {
            return false;
        }
        Appointments other = (Appointments) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.vnh.pojo.Appointments[ id=" + id + " ]";
    }
}