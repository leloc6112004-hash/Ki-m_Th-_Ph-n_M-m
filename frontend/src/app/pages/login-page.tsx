import { useState } from "react";
import { Menu, X, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

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
    if (!password) {
      return "Vui lòng nhập mật khẩu";
    }

    if (password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (password.length > 20) {
      return "Mật khẩu không được quá 20 ký tự";
    }

    return "";
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);

    if (usernameValidation) {
      setUsernameError(usernameValidation);
      return;
    }

    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    // Mock login - check against demo account
    if (username === "leloc6112004@gmail.com" && password === "123456A@a") {
      toast.success("Đăng nhập thành công!");
      login(username); // Set authentication state
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setLoginError("Username hoặc mật khẩu không đúng");
    }
  };

  const handleRegister = () => {
    // Navigate to register page or handle registration
    navigate("/register");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwaGVhbHRoY2FyZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMwMzM3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hospital background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-blue-600/30"></div>
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isPanelOpen ? (
          <X className="w-6 h-6 text-gray-800" />
        ) : (
          <Menu className="w-6 h-6 text-gray-800" />
        )}
      </button>

      {/* Login Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white shadow-2xl z-40 overflow-y-auto"
          >
            <div className="min-h-full flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                  {/* Title */}
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Đăng nhập
                    </h1>
                    <p className="text-gray-600">
                      Chào mừng bạn trở lại với Ecommer Health
                    </p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="space-y-5">
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
                        placeholder="Nhập số điện thoại hoặc email"
                        className={`w-full px-4 py-3 border ${
                          usernameError || loginError ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 ${
                          usernameError || loginError ? "focus:ring-red-500" : "focus:ring-blue-500"
                        } focus:border-transparent transition-all`}
                        required
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          // Clear errors when user starts typing
                          if (usernameError) {
                            setUsernameError("");
                          }
                          if (loginError) {
                            setLoginError("");
                          }
                        }}
                        onBlur={(e) => {
                          // Validate on blur
                          const error = validateUsername(e.target.value);
                          setUsernameError(error);
                        }}
                      />
                      {usernameError && (
                        <p className="text-red-500 text-sm mt-1">
                          {usernameError}
                        </p>
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
                          placeholder="Nhập mật khẩu"
                          className={`w-full px-4 py-3 border ${
                            passwordError || loginError ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 ${
                            passwordError || loginError ? "focus:ring-red-500" : "focus:ring-blue-500"
                          } focus:border-transparent transition-all pr-12`}
                          required
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            // Clear errors when user starts typing
                            if (passwordError) {
                              setPasswordError("");
                            }
                            if (loginError) {
                              setLoginError("");
                            }
                          }}
                          onBlur={(e) => {
                            // Validate on blur
                            const error = validatePassword(e.target.value);
                            setPasswordError(error);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {passwordError && (
                        <p className="text-red-500 text-sm mt-1">
                          {passwordError}
                        </p>
                      )}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>

                    {/* Login Error Message */}
                    {loginError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-sm text-center">{loginError}</p>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="space-y-3 pt-2">
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
                      >
                        Đăng nhập
                      </button>
                      <button
                        type="button"
                        onClick={handleRegister}
                        className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </form>

                  {/* Back to Home */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <button
                      onClick={() => navigate("/")}
                      className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                    >
                      ← Quay lại trang chủ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}