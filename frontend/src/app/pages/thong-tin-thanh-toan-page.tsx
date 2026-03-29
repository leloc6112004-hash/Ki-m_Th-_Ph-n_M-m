import { CreditCard, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppointment } from "../context/AppointmentContext";
import { toast } from "sonner";

export default function ThongTinThanhToanPage() {
  const navigate = useNavigate();
  const { currentBooking, addAppointment, setCurrentBooking } = useAppointment();
  const [showButtons, setShowButtons] = useState(false);

  // Generate order code
  const orderCode = `DH${Date.now().toString().slice(-8)}`;

  const handlePaymentClick = () => {
    setShowButtons(true);
  };

  const handleSuccess = () => {
    if (!currentBooking) return;

    // Create appointment with confirmed status
    const newAppointment = {
      id: Date.now().toString(),
      ...currentBooking,
      status: "Đã xác nhận" as const,
      orderCode,
      amount: 100000,
      createdAt: new Date().toISOString(),
    };

    addAppointment(newAppointment);
    setCurrentBooking(null);

    toast.success("Thanh toán thành công!", {
      description: "Bạn sẽ được chuyển đến trang quản lý lịch hẹn",
    });

    setTimeout(() => {
      navigate("/quan-ly-lich-hen");
    }, 1500);
  };

  const handleFailure = () => {
    toast.error("Thanh toán thất bại!", {
      description: "Vui lòng thử lại",
    });
    
    setTimeout(() => {
      navigate("/thanh-toan");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* MoMo Logo Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* MoMo Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
              <span className="text-white font-bold text-4xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Thanh toán qua Ví MoMo
            </h1>
            <p className="text-gray-600">
              Quét mã QR hoặc xác nhận thanh toán
            </p>
          </div>

          {/* Order Info */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 mb-6 border border-pink-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-pink-200">
                <span className="text-gray-600">Mã đơn hàng</span>
                <span className="font-bold text-gray-900">{orderCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Số tiền</span>
                <span className="text-2xl font-bold text-pink-600">100.000 VNĐ</span>
              </div>
            </div>
          </div>

          {/* Mock QR Code */}
          <div className="bg-gray-100 rounded-xl p-6 mb-6 flex items-center justify-center">
            <div className="w-48 h-48 bg-white rounded-lg shadow-inner flex items-center justify-center border-4 border-gray-200">
              <CreditCard className="w-20 h-20 text-gray-400" />
            </div>
          </div>

          {/* Payment Button or Result Buttons */}
          {!showButtons ? (
            <button
              onClick={handlePaymentClick}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
            >
              Thanh toán bằng Ví MoMo
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-gray-600 font-medium mb-4">
                Mô phỏng kết quả thanh toán
              </p>
              
              {/* Success Button */}
              <button
                onClick={handleSuccess}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-6 h-6" />
                Thành công
              </button>

              {/* Failure Button */}
              <button
                onClick={handleFailure}
                className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <XCircle className="w-6 h-6" />
                Thất bại
              </button>
            </div>
          )}

          {/* Info Note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800 text-center">
              🔒 Giao dịch được bảo mật bởi MoMo
            </p>
            <p className="text-xs text-blue-600 text-center mt-1">
              Đây là môi trường mô phỏng cho mục đích demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}