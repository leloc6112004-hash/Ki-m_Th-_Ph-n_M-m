Registration Validation Rules and OTP Constraints

Add validation rules for the Registration form fields and OTP verification.

Username Field Rules:

The Username field allows users to enter either an email address or a phone number.

Validation requirements:

1. Email format:

* Must contain the character "@"
* Must follow a standard email format

If the email format is invalid, display an error message:
"Email không hợp lệ"

2. Phone number format:

* Must start with the Vietnam country code "+84"
* Must contain exactly 10 digits

If the phone number format is invalid, display an error message:
"Số điện thoại không hợp lệ"

3. Maximum length rule:

* Username must not exceed 20 characters

If the user enters more than 20 characters, display an error message:
"Vượt quá số ký tự cho phép (tối đa 20 ký tự)"

---

Password Field Rules:

Password requirements:

* Minimum length: 6 characters
* Maximum length: 20 characters
* Must contain:

  * At least one uppercase letter
  * At least one lowercase letter
  * At least one number
  * At least one special character

If the password does not meet these requirements, show the error message:

"Mật khẩu phải từ 6–20 ký tự và bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"

---

Confirm Password Field Rules:

The Confirm Password field must exactly match the Password entered above.

If the values do not match, display the error message:

"Mật khẩu nhập lại không khớp"

---

OTP Verification Rules:

After the user clicks "Đăng ký tài khoản", an OTP code will be sent to the user's email or phone number.

OTP requirements:

* OTP validity time: 60 seconds
* Display a countdown timer for 60 seconds

If the user does not enter the OTP within 60 seconds:

* The OTP expires
* The system automatically sends a new OTP to the user

Display message:
"Mã OTP đã hết hạn, hệ thống đã gửi mã OTP mới"

OTP Validation:

If the OTP entered is correct:
Display success message:
"Đăng ký thành công"

Then navigate the user back to the Login Page.

If the OTP entered is incorrect:
Display error message:
"Nhập sai mã OTP, vui lòng thử lại"

Design Behavior:

* Show validation messages directly below the input fields
* Highlight invalid fields with a red border
* Use clear and friendly error messages
* Maintain consistent UI style with the healthcare design system
