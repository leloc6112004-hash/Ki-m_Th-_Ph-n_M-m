# Đặc tả Use Case - ADMIN

---

## UC04 - Quản lý bác sĩ

**Mã usecase:** UC04  
**Tên usecase:** Chức năng quản lý bác sĩ  
**Tác nhân:** Admin  

### Luồng xử lý
Admin đã đăng nhập vào hệ thống và chọn chức năng quản lý bác sĩ.  
Hệ thống hiển thị danh sách bác sĩ hiện có trong hệ thống.  

Admin có thể thực hiện các thao tác: thêm, sửa hoặc xóa bác sĩ.

- Khi admin chọn thêm mới, hệ thống hiển thị form nhập thông tin bác sĩ gồm:
  - Tên  
  - Email  
  - Số điện thoại  
  - Chuyên khoa  
  - Số năm kinh nghiệm  

- Nếu nhập sai:
  - Email phải đúng định dạng (có ký tự @)  
  - Số điện thoại phải bắt đầu bằng +84 và đủ 10 số  
  - Các trường không được để trống  

→ Hệ thống thông báo lỗi và yêu cầu nhập lại  

- Nếu nhập đúng → hệ thống lưu vào cơ sở dữ liệu và hiển thị lại danh sách  

- Khi admin chọn sửa → cập nhật thông tin và lưu lại  

- Khi admin chọn xóa → hệ thống yêu cầu xác nhận trước khi xóa  

Sau mỗi thao tác, hệ thống cập nhật lại danh sách bác sĩ  

### Tiền điều kiện
Admin đã đăng nhập vào hệ thống  

### Hậu điều kiện
Danh sách bác sĩ được cập nhật  

### Điều kiện đặc biệt
Thời gian phản hồi tối đa 20s  

---

## UC05 - Quản lý thuốc

**Mã usecase:** UC05  
**Tên usecase:** Chức năng quản lý thuốc  
**Tác nhân:** Admin  

### Luồng xử lý
Admin truy cập vào chức năng quản lý thuốc.  
Hệ thống hiển thị danh sách thuốc hiện có.  

Admin có thể thực hiện thêm, sửa hoặc xóa thuốc.

- Khi thêm mới, admin nhập:
  - Tên thuốc  
  - Giá  
  - Số lượng  
  - Mô tả  

- Nếu nhập sai:
  - Giá phải là số dương  
  - Số lượng phải ≥ 0  
  - Tên thuốc không được để trống  

→ Hệ thống thông báo lỗi  

- Nếu hợp lệ → hệ thống lưu vào cơ sở dữ liệu  

- Khi sửa → cập nhật thông tin và lưu lại  

- Khi xóa → hệ thống yêu cầu xác nhận trước khi xóa  

Sau mỗi thao tác, hệ thống cập nhật lại danh sách thuốc  

### Tiền điều kiện
Admin đã đăng nhập vào hệ thống  

### Hậu điều kiện
Danh sách thuốc được cập nhật  

### Điều kiện đặc biệt
Thời gian phản hồi tối đa 20s  

---

## UC03 - Quản lý chuyên khoa

**Mã usecase:** UC03  
**Tên usecase:** Chức năng quản lý chuyên khoa  
**Tác nhân:** Admin  

### Luồng xử lý
Admin truy cập vào chức năng quản lý chuyên khoa.  
Hệ thống hiển thị danh sách các chuyên khoa hiện có.  

Admin có thể thêm, sửa hoặc xóa chuyên khoa.

- Khi thêm mới, admin nhập:
  - Tên chuyên khoa  
  - Mô tả  

- Nếu dữ liệu:
  - Vượt quá 100 ký tự  
  - Hoặc để trống  

→ Hệ thống thông báo lỗi  

- Nếu hợp lệ → hệ thống lưu vào cơ sở dữ liệu  

- Khi sửa → cập nhật thông tin và lưu lại  

- Khi xóa → hệ thống yêu cầu xác nhận trước khi xóa  

Sau mỗi thao tác, hệ thống cập nhật lại danh sách chuyên khoa  

### Tiền điều kiện
Admin đã đăng nhập vào hệ thống  

### Hậu điều kiện
Danh sách chuyên khoa được cập nhật  

### Điều kiện đặc biệt
Thời gian phản hồi tối đa 20s  
