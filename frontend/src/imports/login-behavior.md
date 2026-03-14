Login Validation and Post-Login Behavior

Add validation rules and system behavior for the Login Page.

Login Fields:

The login form contains two input fields:

* Username
* Password

Login Validation Rules:

When the user enters Username and Password and clicks the "Đăng nhập" button, the system will check the entered data with the stored data in the database (DB).

Successful Login:

If the Username and Password match the data stored in the database:

Display a notification message:
"Đăng nhập thành công"

After successful login:

* The system navigates the user back to the Homepage.

Homepage UI Changes After Login:

Once the user is logged in:

1. The buttons:

* "Đăng nhập"
* "Đăng ký"

will be removed from the navigation bar.

2. Replace them with a greeting text:

"Xin chào, [Tên người dùng]"

3. Display additional action buttons for logged-in users.

These buttons include:

* Đặt lịch hẹn
* Xem đơn thuốc
* Xem kết quả khám

These buttons can appear:

* In the navigation bar
  or
* As quick access buttons in the main homepage section.

Failed Login:

If the Username or Password does not match the data in the database:

Display an error message:
"Sai tên đăng nhập hoặc mật khẩu"

Error Display Behavior:

* The error message should appear below the password input field.
* The input fields should be highlighted with a red border.
* Maintain a clean and consistent healthcare UI design.

Security Behavior:

* Do not reveal which field is incorrect (Username or Password).
* Always show the general message:
  "Sai tên đăng nhập hoặc mật khẩu"
