package com.vnh.controllers;

import com.vnh.dto.*;
import com.vnh.pojo.*;
import com.vnh.services.*;
import com.vnh.utils.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
public class ApiDoctorController {

    @Autowired private DoctorService doctorService;
    @Autowired private SpecialtyService specialtyService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<DoctorDto>>> getDoctors(@RequestParam(required = false) Integer specialtyId) {
        List<Doctors> list;
        if (specialtyId != null) {
            list = doctorService.getDoctorsBySpecialtyId(specialtyId);
        } else {
            list = doctorService.getDoctors();
        }
        List<DoctorDto> dtos = list.stream().map(DtoMapper::toDoctorDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DoctorDto>> getDoctorById(@PathVariable int id) {
        Doctors d = doctorService.getDoctorById(id);
        if (d != null) {
            return ResponseEntity.ok(ApiResponse.success(DtoMapper.toDoctorDto(d)));
        }
        return ResponseEntity.badRequest().body(ApiResponse.error(404, "Bác sĩ không tồn tại"));
    }

    @GetMapping("/specialties")
    public ResponseEntity<ApiResponse<List<SpecialtyDto>>> getSpecialties() {
        List<Specialties> list = specialtyService.getSpecialties();
        List<SpecialtyDto> dtos = list.stream().map(DtoMapper::toSpecialtyDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }
}
