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

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Nguyen Hung
 */
@Controller
public class MedicineController {

    @Autowired
    private MedicineServices mediService;

    
    @GetMapping("/medicines")
    public String list(Model model, @RequestParam(required = false) Map<String, String> params) {
        
        model.addAttribute("medicines", this.mediService.getMedicines(params));

       
        model.addAttribute("medicine", new Medicines());

        
       
        return "medicines"; // Trả về view "medicines.html"
    }

    // Hiển thị form với dữ liệu thuốc đã có để cập nhật
    @GetMapping("/medicines/{medicineId}")
    public String update(Model model, @PathVariable(value = "medicineId") int id) {
        model.addAttribute("medicine", this.mediService.getMedicineById(id));
        return "medicines"; // Trả về view "medicines.html"
    }

    // Xử lý việc thêm hoặc cập nhật thuốc
    @PostMapping("/medicines")
    public String addOrUpdate(@ModelAttribute(value = "medicine") Medicines m,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) {
        this.mediService.addOrUpdateMedicine(m, imageFile); // Truyền file ảnh vào service
        return "redirect:/"; // Chuyển hướng về trang chủ sau khi lưu thành công
    }

}
