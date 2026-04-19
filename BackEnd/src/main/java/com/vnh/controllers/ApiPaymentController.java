package com.vnh.controllers;

import com.vnh.dto.ApiResponse;
import com.vnh.dto.BillDto;
import com.vnh.pojo.Bills;
import com.vnh.services.PaymentService;
import com.vnh.utils.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class ApiPaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-bill/{appointmentId}")
    public ResponseEntity<ApiResponse<BillDto>> createBill(@PathVariable int appointmentId) {
        Bills b = this.paymentService.createBill(appointmentId);
        if (b != null) {
            return new ResponseEntity<>(ApiResponse.success(DtoMapper.toBillDto(b)), HttpStatus.CREATED);
        }
        return ResponseEntity.badRequest().body(ApiResponse.error(400, "Không thể tạo hóa đơn cho lịch hẹn này"));
    }

    @PostMapping("/pay/{billId}")
    public ResponseEntity<ApiResponse<String>> processPayment(@PathVariable int billId) {
        boolean success = this.paymentService.processPayment(billId, "CASH");
        if (success) {
            return ResponseEntity.ok(ApiResponse.success("Thanh toán thành công!"));
        }
        return ResponseEntity.badRequest().body(ApiResponse.error(400, "Lỗi khi xử lý thanh toán"));
    }
}
