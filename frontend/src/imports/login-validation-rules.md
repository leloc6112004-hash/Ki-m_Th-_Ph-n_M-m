# Login Input Validation Rules

Thêm các quy tắc ràng buộc validation cho các trường nhập liệu trong trang Đăng nhập.

## Login Fields

Form đăng nhập bao gồm hai trường nhập liệu:

* Username (Email hoặc Số điện thoại)
* Password (Mật khẩu)

---

## Username Validation Rules

Khi người dùng nhập Username, hệ thống sẽ kiểm tra theo các quy tắc sau:

### Quy tắc chung:
* **Bắt buộc nhập:** Không được để trống
* **Độ dài tối đa:** 50 ký tự

### Nếu nhập Email:
* Phải chứa ký tự **@**
* Phải có định dạng hợp lệ: `example@domain.com`
* Thông báo lỗi: **"Email không hợp lệ, phải có ký tự @"**

### Nếu nhập Số điện thoại:
* Phải là **10 chữ số**
* Chỉ chứa ký tự số (0-9)
* Phải bắt đầu bằng một trong các đầu số sau:
  - **03** - Viettel
  - **05** - Vietnamobile
  - **07** - Mobifone
  - **08** - Vinaphone
  - **09** - Viettel / Mobifone / Vinaphone

#### Thông báo lỗi cho số điện thoại:
* Nếu không đủ 10 số: **"Số điện thoại phải là 10 số"**
* Nếu không bắt đầu bằng 03/05/07/08/09: **"Số điện thoại không hợp lệ, vui lòng nhập đúng số điện thoại"**

### Validation Behavior:
* Kiểm tra **khi rời khỏi ô nhập** (onBlur)
* Hiển thị **viền đỏ** khi có lỗi
* Xóa lỗi **ngay khi người dùng bắt đầu gõ**

---

## Password Validation Rules

Khi người dùng nhập Password, hệ thống sẽ kiểm tra theo các quy tắc sau:

### Quy tắc:
* **Bắt buộc nhập:** Không được để trống
* **Độ dài tối thiểu:** 6 ký tự
* **Độ dài tối đa:** 20 ký tự

### Thông báo lỗi:
* Nếu để trống: **"Vui lòng nhập mật khẩu"**
* Nếu ít hơn 6 ký tự: **"Mật khẩu phải có ít nhất 6 ký tự"**
* Nếu nhiều hơn 20 ký tự: **"Mật khẩu không được quá 20 ký tự"**

### Validation Behavior:
* Kiểm tra **khi rời khỏi ô nhập** (onBlur)
* Hiển thị **viền đỏ** khi có lỗi
* Xóa lỗi **ngay khi người dùng bắt đầu gõ**
* Có nút **hiện/ẩn mật khẩu** (eye icon)

---

## Login Error Handling

### Khi đăng nhập thất bại:

Nếu Username hoặc Password không khớp với dữ liệu trong database:

#### Hiển thị thông báo lỗi:
**"Username hoặc mật khẩu không đúng"**

#### Error Display Behavior:
* Thông báo lỗi xuất hiện **giữa nút "Quên mật khẩu?" và nút "Đăng nhập"**
* Hiển thị trong **hộp nền đỏ nhạt** (bg-red-50) với viền đỏ
* **Cả hai ô nhập** (Username và Password) sẽ có viền đỏ
* Xóa thông báo lỗi **ngay khi người dùng bắt đầu gõ vào bất kỳ ô nào**

#### Security Behavior:
* **Không tiết lộ** trường nào sai (Username hay Password)
* Luôn hiển thị thông báo chung: **"Username hoặc mật khẩu không đúng"**

---

## UI/UX Behavior Summary

### Real-time Validation:
1. **Khi người dùng nhập liệu:**
   - Xóa thông báo lỗi ngay lập tức
   - Xóa viền đỏ khi bắt đầu sửa

2. **Khi rời khỏi ô nhập (blur):**
   - Kiểm tra validation
   - Hiển thị lỗi nếu có

3. **Khi submit form:**
   - Kiểm tra tất cả validation
   - Dừng submit nếu có lỗi
   - Gửi request đăng nhập nếu hợp lệ

### Visual Feedback:
* **Border màu đỏ** - Khi có lỗi
* **Border màu xanh** - Khi focus và không có lỗi
* **Thông báo lỗi màu đỏ** - Dưới mỗi ô nhập
* **Hộp thông báo lỗi đăng nhập** - Giữa form với nền đỏ nhạt

---

## Demo Data

Để test chức năng đăng nhập thành công:
* Username: **leloc6112004@gmail.com**
* Password: **123456A@a**

Sau khi đăng nhập thành công:
* Hiển thị toast: **"Đăng nhập thành công!"**
* Chuyển hướng về trang chủ (Homepage)