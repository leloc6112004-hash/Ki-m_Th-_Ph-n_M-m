package com.vnh.mapper;


import com.vnh.pojo.Patients;
import com.vnh.dto.PatientDto;
import com.vnh.mapper.UserMapper;
import org.springframework.stereotype.Component;
@Component
public class PatientMapper {
    public static PatientDto toPatientDto(Patients patient) {
        if (patient == null) {
            return null;
        }
        PatientDto dto = new PatientDto();
        dto.setId(patient.getId());
        dto.setPatientCode(patient.getPatientCode());
        dto.setUser(UserMapper.toUserDto(patient.getUserId()));
        return dto;
    }
}