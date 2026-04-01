package com.vnh.dto;

import com.vnh.dto.UserDto;

public class PatientDto {
    private Integer id;
    private String patientCode;
    

    private UserDto user;

    public PatientDto() {
        // Default constructor
    }

    public PatientDto(Integer id, String patientCode, UserDto user) {
        this.id = id;
        this.patientCode = patientCode;
        this.user = user;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getPatientCode() {
        return patientCode;
    }

    public UserDto getUser() {
        return user;
    }

    // Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setPatientCode(String patientCode) {
        this.patientCode = patientCode;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}