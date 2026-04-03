/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.controllers;

import com.vnh.pojo.Medicines;
import com.vnh.services.MedicineServices;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nguyen Hung
 */
@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiMedicineController {

    @Autowired
    private MedicineServices mediService;

    @DeleteMapping("/medicines/{medicineId}")
    public void delete(@PathVariable int medicineId) {
        this.mediService.deleteMedicine(medicineId);
    }

    @GetMapping("/medicines")
    public ResponseEntity<List<Medicines>> list(@RequestParam Map<String, String> params) {
        return new ResponseEntity<>(this.mediService.getMedicines(params), HttpStatus.OK);
    }
}
