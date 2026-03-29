import { useState } from "react";
import { useNavigate } from "react-router";
import { useDoctorAuth } from "../context";
import { Stethoscope, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function DoctorLoginPage() {
  const navigate = useNavigate();
  const { login } = useDoctorAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("=== DOCTOR LOGIN DEBUG ===");
    console.log("Form data:", formData);
    console.log("Email length:", formData.email.length);
    console.log("Password length:", formData.password.length);
    console.log("Email bytes:", Array.from(formData.email).map(c => c.charCodeAt(0)));
    
    const success = login(formData.email, formData.password);
    
    console.log("Login result:", success);
    
    if (success) {
      toast.success("✅ Đăng nhập thành công!");
      // Small delay to ensure state is updated
      setTimeout(() => {
        navigate("/bacsi/dashboard");
      }, 100);
    } else {
      setError("Email hoặc mật khẩu không chính xác");
      toast.error("❌ Đăng nhập thất bại!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleAutoFill = () => {
    setFormData({
      email: "Bacsi@gmail.com",
      password: "Bacsi123@@",
    });
    setError("");
    toast.success("✅ Đã tự động điền tài khoản demo!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <Stethoscope className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đăng nhập Bác sĩ
            </h1>
            <p className="text-gray-600">
              Hệ thống quản lý khám bệnh
            </p>
          </div>

          {/* Demo Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-blue-900">Tài khoản demo:</p>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors font-semibold"
              >
                Tự động điền
              </button>
            </div>
            <p className="text-sm text-blue-700">Email: Bacsi@gmail.com</p>
            <p className="text-sm text-blue-700">Mật khẩu: Bacsi123@@</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-blue-600" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập địa chỉ email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 text-blue-600" />
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Đăng nhập
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium block w-full"
            >
              ← Quay lại trang chủ
            </button>
            <button
              onClick={() => navigate("/bacsi/auth-test")}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium"
            >
              🔧 Debug Auth Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}