Username Validation Rules (Updated)

Add validation logic for the Username field in the registration form.

The Username field allows users to enter either:

* An email address
* A Vietnamese phone number

Email Validation Rules:

If the user enters a text string (characters), the system will treat it as an email address.

Email requirements:

* The email must contain the character "@"

If the email does not contain "@", display the error message:

"Email không hợp lệ, phải có ký tự @"

Phone Number Validation Rules:

If the user enters only numeric characters, the system will treat it as a phone number.

Phone number requirements:

* Only digits are allowed
* The phone number must start with one of the following prefixes:

  * 03
  * 07
  * 09

If the phone number does not start with one of these prefixes, display the error message:

"Số điện thoại không hợp lệ, vui lòng nhập đúng số điện thoại Việt Nam"

Maximum Length Rule:

The Username field must not exceed 20 characters.

If the user enters more than 20 characters, display the error message:

"Vượt quá số ký tự cho phép (tối đa 20 ký tự)"

Error Display Behavior:

* Error messages should appear directly below the Username input field
* The input field should be highlighted with a red border when validation fails
* Maintain consistent UI style with the healthcare design system
