package com.vnh.services;

import com.vnh.pojo.Bills;
import java.util.Map;

public interface PaymentService {
    Bills createBill(int appointmentId);
    boolean processPayment(int billId, String method);
}
