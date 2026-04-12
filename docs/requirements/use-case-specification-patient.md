# 📘 ĐẶC TẢ USE CASE – PHÂN HỆ BỆNH NHÂN

## 🎯 Actor: Bệnh nhân

---

# 1. 🗓️ Use Case: Đặt lịch hẹn khám

**Use Case ID:** UC-01  
**Actor:** Bệnh nhân  

## Mô tả
Bệnh nhân đặt lịch khám với bác sĩ theo thời gian phù hợp.

## Tiền điều kiện
- Bệnh nhân đã đăng nhập hệ thống  
- Hệ thống có danh sách bác sĩ và lịch trống  

## Hậu điều kiện
- Lịch hẹn được tạo thành công  
- Trạng thái: Chờ xác nhận / Đã xác nhận  

## Luồng chính
1. Bệnh nhân chọn chức năng "Đặt lịch hẹn"  
2. Hệ thống hiển thị danh sách bác sĩ  
3. Bệnh nhân chọn bác sĩ  
4. Hệ thống hiển thị lịch trống  
5. Bệnh nhân chọn ngày giờ  
6. Bệnh nhân nhập thông tin (triệu chứng, ghi chú)  
7. Bệnh nhân xác nhận đặt lịch  
8. Hệ thống lưu lịch hẹn  
9. Hệ thống thông báo thành công  

## Luồng thay thế
- A1: Không có lịch trống → Hiển thị thông báo  
- A2: Bệnh nhân chưa đăng nhập → Yêu cầu đăng nhập  

---

# 2. 💳 Use Case: Thanh toán

**Use Case ID:** UC-02  
**Actor:** Bệnh nhân  

## Mô tả
Bệnh nhân thanh toán chi phí khám bệnh.

## Tiền điều kiện
- Bệnh nhân đã có lịch hẹn  
- Hệ thống có thông tin chi phí  

## Hậu điều kiện
- Kết quả thanh toán được ghi nhận (thành công / thất bại)  

## Luồng chính
1. Bệnh nhân chọn lịch hẹn cần thanh toán  
2. Hệ thống hiển thị chi phí  
3. Bệnh nhân chọn phương thức thanh toán  
4. Bệnh nhân xác nhận thanh toán  
5. Hệ thống xử lý giao dịch  
6. Hệ thống thông báo kết quả  

## Luồng thay thế
- A1: Thanh toán thất bại → Hiển thị lỗi  
- A2: Bệnh nhân hủy thanh toán  

---

# 3. 📄 Use Case: Xem kết quả khám

**Use Case ID:** UC-03  
**Actor:** Bệnh nhân  

## Mô tả
Bệnh nhân xem kết quả khám sau khi bác sĩ cập nhật.

## Tiền điều kiện
- Bệnh nhân đã khám xong  
- Bác sĩ đã cập nhật kết quả  

## Hậu điều kiện
- Bệnh nhân xem được kết quả khám  

## Luồng chính
1. Bệnh nhân đăng nhập  
2. Chọn mục "Kết quả khám"  
3. Hệ thống hiển thị danh sách kết quả  
4. Bệnh nhân chọn kết quả cần xem  
5. Hệ thống hiển thị chi tiết  

## Luồng thay thế
- A1: Chưa có kết quả → Hiển thị thông báo  

---

# 4. 💊 Use Case: Xem đơn thuốc

**Use Case ID:** UC-04  
**Actor:** Bệnh nhân  

## Mô tả
Bệnh nhân xem đơn thuốc được bác sĩ kê.

## Tiền điều kiện
- Có kết quả khám  
- Có đơn thuốc  

## Hậu điều kiện
- Bệnh nhân xem được đơn thuốc  

## Luồng chính
1. Bệnh nhân chọn mục "Đơn thuốc"  
2. Hệ thống hiển thị danh sách đơn thuốc  
3. Bệnh nhân chọn đơn thuốc  
4. Hệ thống hiển thị chi tiết (tên thuốc, liều lượng, cách dùng)  

## Luồng thay thế
- A1: Không có đơn thuốc → Hiển thị thông báo  

---

# 🔥 Ghi chú
- Tài liệu này có thể mở rộng thêm:
  - Business Rules (Quy tắc nghiệp vụ)  
  - Exception Flow (Luồng ngoại lệ chi tiết)  
  - Priority / Frequency (Độ ưu tiên / Tần suất sử dụng)  
