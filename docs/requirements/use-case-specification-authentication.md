# Đặc tả Use Case - Người dùng

---

## UC01 - Chức năng đăng nhập

**Mã usecase:** UC01  
**Tên usecase:** chức năng đăng nhập  
**Tác nhân:** Bệnh nhân, bác sĩ, Admin  

### Luồng xử lý
Người dùng vào trang chủ và chọn chức năng đăng nhập để đăng nhập vào trang để sử dụng các chức năng.  

Chức năng đăng nhập với 2 trường nhập là username và password.  

- Username: người dùng nhập đúng username đã lưu trong DB nếu không sẽ thông báo sai tên đăng nhập.  
  Email hoặc số điện thoại nếu nhập không đúng theo định dạng email và số điện thoại sẽ gửi thông báo email hoặc số điện thoại không hợp lệ.  
  Đối với email người dùng nhập dạng chuỗi và phải có @.  
  Đối với số điện thoại người dùng nhập số phải bắt đầu bằng mã vùng Việt Nam +84, với 2 số đầu là 03,05,07,08,09 và gồm 10 số.  
  Và nhập tối đa 50 ký tự thì thông báo lỗi.  

- Password: người dùng nhập đúng mật khẩu đã lưu trong DB nếu không thông báo lỗi.  
  Và nhập tối đa 20 ký tự thì thông báo lỗi.  

### Hậu điều kiện
Thông báo đăng nhập thành công và vào trang để dùng các chức năng  

### Điều kiện đặc biệt
Thời gian phản hồi tối đa 20s  

---

## UC02 - Chức năng đăng ký

**Mã usecase:** UC02  
**Tên usecase:** chức năng đăng ký  
**Tác nhân:** Bệnh nhân  

### Luồng xử lý
Người dùng không có tài khoản có thể click vào nút đăng ký để đăng ký tài khoản.  
Người dùng yêu cầu điền email và số điện để làm username và password và nhập lại password để xác thực.  

- Username: người dùng nhập email hoặc số điện thoại.  
  Nếu nhập không đúng theo định dạng email và số điện thoại sẽ gửi thông báo email hoặc số điện thoại không hợp lệ.  
  Đối với email người dùng nhập dạng chuỗi và phải có @.  
  Đối với số điện thoại người dùng nhập số phải bắt đầu bằng mã vùng Việt Nam +84, với 2 số đầu là 03,05,07,08,09 và gồm 10 số.  
  Nếu nhập tối đa 50 ký tự thông báo lỗi vượt quá ký tự cho phép.  

- Password: người dùng nhập tối đa 20 ký tự, tối thiểu 6 ký tự bao gồm ký tự hoa, thường, đặc biệt và số.  

- Nhập lại password phải nhập khớp với password ban đầu nếu không sẽ thông báo lỗi nhập sai password.  

Sau khi nhập thành công click vào nút tạo tài khoản thì sẽ hiện ra trang mới yêu cầu nhập mã OTP.  
Mã OTP sẽ gửi về số điện thoại và email, nếu OTP quá hạn người dùng có thể yêu cầu gửi lại mã OTP.  
Trong quá trình 60s đếm OTP nút gửi lại mã sẽ không được kích hoạt, sau khi đếm về 0 nút mới được kích hoạt bấm gửi lại.  

### Hậu điều kiện
Thông báo đăng ký thành công và trở về trang đăng nhập  

### Điều kiện đặc biệt
Thời gian phản hồi tối đa 20s và thời hạn OTP là 60s nếu quá 60s sẽ gửi OTP cho khách hàng  

---

## UC03 - Chức năng quên mật khẩu

**Mã usecase:** UC03  
**Tên usecase:** chức năng quên mật khẩu  
**Tác nhân:** Bệnh nhân, bác sĩ, admin  

### Luồng xử lý
Người dùng đã có tài khoản và bị quên mật khẩu, người dùng có thể click vào nút quên mật khẩu sẽ hiện ra trang mới để người dùng nhập số điện thoại và email.  

Nếu người dùng nhập email và số điện thoại sai định dạng sẽ thông báo nhập sai vui lòng nhập lại.  
Đối với email người dùng nhập dạng chuỗi và phải có @.  
Đối với số điện thoại người dùng nhập số phải bắt đầu bằng mã vùng Việt Nam +84, với 2 số đầu là 03,05,07,08,09 và gồm 10 số.  
Nếu nhập tối đa 50 ký tự thông báo lỗi vượt quá ký tự cho phép.  

Nếu nhập đúng sẽ chuyển sang gửi mã OTP về số điện thoại hoặc email để xác thực.  

OTP quá hạn người dùng có thể yêu cầu gửi lại mã OTP.  
Trong quá trình 60s đếm OTP nút gửi lại mã sẽ không được kích hoạt, sau khi đếm về 0 nút mới được kích hoạt bấm gửi lại.  

Sau khi nhập OTP đúng sẽ chuyển sang trang cập nhật password mới và nhập lại password.  

- Password: người dùng nhập tối đa 20 ký tự bao gồm ký tự hoa, thường, đặc biệt và số.  

- Nhập lại password phải nhập khớp với password ban đầu nếu không sẽ thông báo lỗi nhập sai password.  

### Tiền điều kiện
Người dùng đã có tài khoản  

### Hậu điều kiện
Thông báo đổi mật khẩu thành công và trở về trang đăng nhập  

### Điều kiện đặc biệt
Thời gian phản hồi tối đa 20s và thời hạn OTP là 60s nếu quá 60s sẽ gửi OTP cho khách hàng  
