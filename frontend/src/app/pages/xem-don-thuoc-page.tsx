import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function XemDonThuocPage() {
  const navigate = useNavigate();
  const { username } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 md:mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span>Quay lại trang chủ</span>
        </button>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full mb-3 md:mb-4">
                <FileText className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                Xem đơn thuốc
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 px-4">
                Xin chào <span className="font-semibold text-blue-600">{username}</span>, 
                tính năng xem đơn thuốc đang được phát triển
              </p>
            </div>

            {/* Coming Soon Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 text-center">
              <p className="text-blue-800 text-base md:text-lg font-medium mb-2">
                🚀 Tính năng sắp ra mắt
              </p>
              <p className="text-blue-700 text-sm md:text-base">
                Chúng tôi đang hoàn thiện tính năng xem đơn thuốc để mang đến trải nghiệm tốt nhất cho bạn.
                Vui lòng quay lại sau!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}