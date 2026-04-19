# ĐẶC TẢ USE CASE – ACTOR: BÁC SĨ

## Actor: Bác sĩ  
Là người sử dụng hệ thống để xem lịch khám, ghi chẩn đoán và kê đơn thuốc cho bệnh nhân.

---

# 1. USE CASE: XEM LỊCH KHÁM

## Tên Use Case:
Xem lịch khám

## Mô tả:
Cho phép bác sĩ xem danh sách các lịch hẹn khám bệnh của mình theo ngày.

## Actor:
Bác sĩ

## Tiền điều kiện (Pre-condition):
- Bác sĩ đã đăng nhập vào hệ thống

## Hậu điều kiện (Post-condition):
- Danh sách lịch khám được hiển thị

## Luồng chính (Main Flow):
1. Bác sĩ truy cập chức năng "Xem lịch khám"
2. Hệ thống hiển thị danh sách lịch khám theo ngày hiện tại
3. Bác sĩ có thể chọn ngày khác để xem
4. Hệ thống cập nhật danh sách lịch khám theo ngày được chọn

## Luồng thay thế (Alternative Flow):
### A1: Không có lịch khám
- Ở bước 2:
  - Hệ thống hiển thị thông báo: "Không có lịch khám"

## Luồng ngoại lệ (Exception Flow):
### E1: Lỗi hệ thống
- Hệ thống hiển thị thông báo lỗi

---

# 2. USE CASE: GHI CHẨN ĐOÁN

## Tên Use Case:
Ghi chẩn đoán

## Mô tả:
Bác sĩ nhập thông tin chẩn đoán cho bệnh nhân sau khi khám

## Actor:
Bác sĩ

## Tiền điều kiện:
- Bác sĩ đã đăng nhập
- Bệnh nhân đã có lịch khám hợp lệ

## Hậu điều kiện:
- Thông tin chẩn đoán được lưu vào hệ thống

## Luồng chính:
1. Bác sĩ chọn một bệnh nhân từ danh sách lịch khám
2. Bác sĩ chọn chức năng "Ghi chẩn đoán"
3. Hệ thống hiển thị form nhập chẩn đoán
4. Bác sĩ nhập:
   - Triệu chứng
   - Kết luận chẩn đoán
5. Bác sĩ nhấn "Lưu"
6. Hệ thống lưu thông tin chẩn đoán

## Luồng thay thế:
### A1: Dữ liệu không hợp lệ
- Ở bước 5:
  - Hệ thống thông báo lỗi và yêu cầu nhập lại

## Luồng ngoại lệ:
### E1: Lỗi lưu dữ liệu
- Hệ thống hiển thị lỗi và không lưu thông tin

---

# 3. USE CASE: KÊ ĐƠN THUỐC

## Tên Use Case:
Kê đơn thuốc

## Mô tả:
Bác sĩ tạo đơn thuốc cho bệnh nhân dựa trên chẩn đoán

## Actor:
Bác sĩ

## Tiền điều kiện:
- Bác sĩ đã đăng nhập
- Đã có chẩn đoán cho bệnh nhân

## Hậu điều kiện:
- Đơn thuốc được lưu thành công

## Luồng chính:
1. Bác sĩ chọn bệnh nhân
2. Bác sĩ chọn chức năng "Kê đơn thuốc"
3. Hệ thống hiển thị form kê đơn
4. Bác sĩ nhập thông tin thuốc:
   - Tên thuốc
   - Liều lượng
   - Cách dùng
5. Bác sĩ nhấn "Lưu đơn"
6. Hệ thống lưu đơn thuốc

## Luồng thay thế:
### A1: Thiếu thông tin thuốc
- Ở bước 5:
  - Hệ thống yêu cầu nhập đầy đủ thông tin

## Luồng ngoại lệ:
### E1: Lỗi hệ thống
- Hệ thống thông báo lỗi, không lưu đơn thuốc
