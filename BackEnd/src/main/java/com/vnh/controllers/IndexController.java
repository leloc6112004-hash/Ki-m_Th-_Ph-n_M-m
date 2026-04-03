/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.vnh.controllers;

import com.vnh.services.MedicineServices;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author Nguyen Hung
 */
@Controller
@ControllerAdvice
public class IndexController {

    @Autowired
    private MedicineServices mediService;

    @RequestMapping("/")
    public String index(Model model, @RequestParam Map<String, String> params) {

        model.addAttribute("medicines", this.mediService.getMedicines(params));
        model.addAttribute("expiringMedicines", this.mediService.getExpiringMedicines(30));

        // Cảnh báo thuốc sắp hết trong kho (dưới 20 đơn vị)
        model.addAttribute("lowStockMedicines", this.mediService.getLowStockMedicines(20));
        return "index";
    }
}
