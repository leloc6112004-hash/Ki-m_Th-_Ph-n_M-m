import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);

  // OTP Timer
  useEffect(() => {
    if (step === "otp" && otpTimer > 0) {
      const timer = setTimeout(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, otpTimer]);

  const validateContact = (contact: string): string => {
    if (!contact.trim()) {
      return "Vui lòng nhập email hoặc số điện thoại";
    }

    if (contact.length > 50) {
      return "Vượt quá số ký tự cho phép (tối đa 50 ký tự)";
    }

    // Check if it contains only numeric characters (phone number)
    const isNumeric = /^\d+$/.test(contact);
    
    if (isNumeric) {
      // Validate as phone number - must start with 03, 05, 07, 08, or 09
      if (!contact.startsWith("03") && !contact.startsWith("05") && !contact.startsWith("07") && !contact.startsWith("08") && !contact.startsWith("09")) {
        return "Số điện thoại không hợp lệ, vui lòng nhập đúng số điện thoại";
      }
      
      // Must be exactly 10 digits
      if (contact.length !== 10) {
        return "Số điện thoại phải là 10 số";
      }
    } else {
      // Validate as email - must contain "@"
      if (!contact.includes("@")) {
        return "Email không hợp lệ, phải có ký tự @";
      }
      
      // Optional: validate complete email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        return "Email không hợp lệ, phải có ký tự @";
      }
    }

    return "";
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateContact(email);
    if (error) {
      setEmailError(error);
      return;
    }
    // Simulate sending OTP
    toast.success("Mã OTP đã được gửi đến " + email);
    setStep("otp");
    setOtpTimer(60);
  };

  const handleOtpVerify = () => {
    // Mock OTP verification - accept "123456" as correct OTP
    if (otp === "123456") {
      toast.success("Xác thực thành công");
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
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1765222385397-6c2ea556086f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbnVyc2UlMjBtZWRpY2FsJTIwc3VwcG9ydHxlbnwxfHx8fDE3NzMwNjgzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
            {step === "email" ? (
              <>
                {/* Email Step */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Quên mật khẩu
                  </h1>
                  <p className="text-gray-600">
                    Nhập email hoặc số điện thoại để khôi phục mật khẩu
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  {/* Email/Phone Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email / Số điện thoại
                    </label>
                    <input
                      id="contact"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        // Clear error when user starts typing
                        if (emailError) {
                          setEmailError("");
                        }
                      }}
                      onBlur={(e) => {
                        // Validate on blur
                        const error = validateContact(e.target.value);
                        setEmailError(error);
                      }}
                      placeholder="Nhập số điện thoại hoặc email"
                      className={`w-full px-4 py-3 border ${
                        emailError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 ${
                        emailError ? "focus:ring-red-500" : "focus:ring-blue-500"
                      } focus:border-transparent transition-all`}
                      required
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
                  >
                    Xác nhận
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* OTP Step */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Xác thực OTP
                  </h1>
                  <p className="text-gray-600">
                    Vui lòng nhập mã OTP đã được gửi đến email hoặc số điện thoại của bạn.
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    {email}
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
                              toast.success("Xác thực thành công");
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

                  {/* Change Email/Phone */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("email");
                        setOtp("");
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                    >
                      Thay đổi email/số điện thoại
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Demo Hint */}
          <div className="mt-4 text-center text-white text-sm bg-black/30 rounded-lg p-3 backdrop-blur-sm">
            <p>💡 Demo: Sử dụng mã OTP <strong>123456</strong> để xác thực thành công</p>
          </div>
        </div>
      </div>
    </div>
  );
}