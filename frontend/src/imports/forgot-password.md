Forgot Password Interaction Flow

Add a password recovery flow connected to the login page.

When the user clicks the text link "Quên mật khẩu?" on the login panel, the system navigates to a new page called the Forgot Password page.

Forgot Password Page Layout:

The page keeps the same modern healthcare design style used in the login page:

* Minimalist medical UI
* White, light blue, and soft green colors
* Rounded components
* Soft shadows
* Clean typography

The background can still use a full-screen healthcare themed image.

Content Layout:

Inside a centered frame or card.

Title (H1):
Quên mật khẩu

Input Field:
Label: Email / Số điện thoại

Placeholder text inside the input field:
Nhập số điện thoại hoặc email

Below the input field add a primary button:

Button:
Xác nhận

OTP Verification Flow:

When the user clicks the "Xác nhận" button, the system displays an OTP verification section.

OTP Section Layout:

Title:
Xác thực OTP

Description text:
Vui lòng nhập mã OTP đã được gửi đến email hoặc số điện thoại của bạn.

OTP Input:
Display multiple OTP input boxes (for example 4–6 digits).

Below the OTP input show a text link:

Gửi lại mã OTP

Below that place a button:

Xác nhận

OTP Interaction Logic:

If the user enters the correct OTP:

* Show a success notification message: "Xác thực thành công"
* Automatically navigate back to the Login Page.

If the user enters an incorrect OTP:

* Show an error message: "Nhập sai mã OTP, vui lòng thử lại."

Design Requirements:

* Maintain consistent spacing and alignment
* Use rounded input fields and buttons
* Use smooth UI transitions between steps
* The layout should remain responsive on different screen sizes
