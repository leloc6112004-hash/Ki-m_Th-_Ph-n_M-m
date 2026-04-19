package com.vnh.repositories;

import com.vnh.pojo.Bills;
import java.util.List;

public interface BillRepository {
    Bills addBill(Bills b);
    Bills getBillById(int id);
    List<Bills> getBillsByPatient(int patientId);
    boolean updateStatus(int billId, String status);
}
