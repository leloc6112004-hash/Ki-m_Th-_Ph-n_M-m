import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { toast } from "sonner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"register" | "otp">("register");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  // OTP Timer
  useEffect(() => {
    if (step === "otp" && otpTimer > 0) {
      const timer = setTimeout(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, otpTimer]);

  const validateUsername = (username: string): string => {
    if (!username.trim()) {
      return "Vui lòng nhập username";
    }

    if (username.length > 50) {
      return "Vượt quá số ký tự cho phép (tối đa 50 ký tự)";
    }

    // Check if it contains only numeric characters (phone number)
    const isNumeric = /^\d+$/.test(username);
    
    if (isNumeric) {
      // Validate as phone number - must start with 03, 05, 07, 08, or 09
      if (!username.startsWith("03") && !username.startsWith("05") && !username.startsWith("07") && !username.startsWith("08") && !username.startsWith("09")) {
        return "Số điện thoại không hợp lệ, vui lòng nhập đúng số điện thoại";
      }
      
      // Must be exactly 10 digits
      if (username.length !== 10) {
        return "Số điện thoại phải là 10 số";
      }
    } else {
      // Validate as email - must contain "@"
      if (!username.includes("@")) {
        return "Email không hợp lệ, phải có ký tự @";
      }
      
      // Optional: validate complete email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) {
        return "Email không hợp lệ, phải có ký tự @";
      }
    }

    return "";
  };

  const validatePassword = (password: string): string => {
    if (password.length < 6 || password.length > 20) {
      return "Mật khẩu phải từ 6–20 ký tự và bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return "Mật khẩu phải từ 6–20 ký tự và bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
    }

    return "";
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (password !== confirmPassword) {
      return "Mật khẩu nhập lại không khớp";
    }
    return "";
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

    setErrors({
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // If any errors, don't proceed
    if (usernameError || passwordError || confirmPasswordError) {
      return;
    }

    // Simulate sending OTP
    toast.success("Mã OTP đã được gửi đến " + formData.username);
    setStep("otp");
    setOtpTimer(60);
    setOtp("");
  };

  const handleOtpVerify = () => {
    // Mock OTP verification - accept "123456" as correct OTP
    if (otp === "123456") {
      toast.success("Đăng ký thành công");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else if (otp.length === 6) {
      toast.error("Nhập sai mã OTP, vui lòng thử lại.");
      setOtp("");
    }
  };

  const handleResendOtp = () => {
    if (otpTimer > 0) return; // Prevent resend if timer is still running
    
    toast.success("Mã OTP mới đã được gửi lại");
    setOtp("");
    setOtpTimer(60);
    setIsOtpExpired(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758574437877-68a1ec5fafc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjB0ZWFtJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3MzA2ODc3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Healthcare background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-green-600/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate("/login")}
            className="mb-6 flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại đăng nhập</span>
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            {step === "register" ? (
              <>
                {/* Registration Step */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Đăng ký
                  </h1>
                  <p className="text-gray-600">
                    Tạo tài khoản mới để sử dụng dịch vụ
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  {/* Username Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => {
                        setFormData({ ...formData, username: e.target.value });
                        // Clear error when user starts typing
                        if (errors.username) {
                          setErrors({ ...errors, username: "" });
                        }
                      }}
                      onBlur={(e) => {
                        // Validate on blur
                        const error = validateUsername(e.target.value);
                        setErrors({ ...errors, username: error });
                      }}
                      placeholder="Nhập số điện thoại hoặc email"
                      className={`w-full px-4 py-3 border ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 ${
                        errors.username ? "focus:ring-red-500" : "focus:ring-blue-500"
                      } focus:border-transparent transition-all`}
                      required
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500 mt-1">{errors.username}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Nhập mật khẩu"
                        className={`w-full px-4 py-3 border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 ${
                          errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                        } focus:border-transparent transition-all pr-12`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Nhập lại mật khẩu"
                        className={`w-full px-4 py-3 border ${
                          errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 ${
                          errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-blue-500"
                        } focus:border-transparent transition-all pr-12`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
                  >
                    Đăng ký tài khoản
                  </button>
                </form>

                {/* Login Link */}
                <div className="text-center text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    Đăng nhập ngay
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* OTP Step */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Xác thực OTP
                  </h1>
                  <p className="text-gray-600">
                    Vui lòng nhập mã OTP đ được gửi đến email hoặc số điện thoại của bạn.
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    {formData.username}
                  </p>
                </div>

                <div className="space-y-5">
                  {/* OTP Timer */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                      <span className={`text-2xl font-bold ${
                        otpTimer <= 10 ? "text-red-500" : "text-blue-600"
                      }`}>
                        {otpTimer}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Mã OTP sẽ hết hạn sau {otpTimer} giây
                    </p>
                  </div>

                  {/* OTP Input */}
                  <div className="flex flex-col items-center space-y-4">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => {
                        setOtp(value);
                        if (value.length === 6) {
                          // Auto-verify when 6 digits are entered
                          setTimeout(() => {
                            if (value === "123456") {
                              toast.success("Đăng ký thành công");
                              setTimeout(() => {
                                navigate("/login");
                              }, 1500);
                            } else {
                              toast.error("Nhập sai mã OTP, vui lòng thử lại.");
                              setOtp("");
                            }
                          }, 300);
                        }
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                    <p className="text-sm text-gray-500">
                      Nhập mã 6 chữ số
                    </p>
                  </div>

                  {/* Resend OTP */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={otpTimer > 0}
                      className={`text-sm transition-all ${
                        otpTimer > 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-600 hover:text-blue-700 hover:underline"
                      }`}
                    >
                      Gửi lại mã OTP {otpTimer > 0 && `(${otpTimer}s)`}
                    </button>
                  </div>

                  {/* Verify Button */}
                  <button
                    type="button"
                    onClick={handleOtpVerify}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={otp.length !== 6}
                  >
                    Xác nhận
                  </button>

                  {/* Change Username */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("register");
                        setOtp("");
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                    >
                      Thay đổi thông tin đăng ký
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Demo Hint */}
          <div className="mt-4 text-center text-white text-sm bg-black/30 rounded-lg p-3 backdrop-blur-sm space-y-1">
            {step === "register" ? (
              <>
                <p>💡 <strong>Ví dụ hợp lệ:</strong></p>
                <p>Email: user@example.com | Phone: 0912345678 (03, 05, 07, 08, 09)</p>
                <p>Password: Pass@123 (chữ hoa, chữ thường, số, ký tự đặc biệt)</p>
              </>
            ) : (
              <p>💡 Demo: Sử dụng mã OTP <strong>123456</strong> để xác thực thành công</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}