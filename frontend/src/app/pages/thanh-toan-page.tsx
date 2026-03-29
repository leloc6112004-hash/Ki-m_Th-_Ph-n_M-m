import { ArrowLeft, CreditCard, User, Phone, Stethoscope, Calendar, Clock, FileText, MessageSquare, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppointment } from "../context/AppointmentContext";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ThanhToanPage() {
  const navigate = useNavigate();
  const { currentBooking } = useAppointment();

  useEffect(() => {
    if (!currentBooking) {
      toast.error("Vui lòng điền thông tin đặt lịch trước");
      navigate("/dat-lich-hen");
    }
  }, [currentBooking, navigate]);

  if (!currentBooking) {
    return null;
  }

  const handlePayment = () => {
    navigate("/thong-tin-thanh-toan");
  };

  const handleBack = () => {
    navigate("/dat-lich-hen");
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại</span>
        </button>

        {/* Main Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Thanh toán
              </h1>
              <p className="text-gray-600">
                Xác nhận thông tin và hoàn tất thanh toán
              </p>
            </div>

            {/* Appointment Summary */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Thông tin đặt lịch
              </h2>

              <div className="space-y-4">
                {/* Họ tên */}
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                    <p className="font-semibold text-gray-900">{currentBooking.fullName}</p>
                  </div>
                </div>

                {/* Ngày sinh */}
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ngày sinh</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(currentBooking.dateOfBirth).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>

                {/* Giới tính */}
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Giới tính</p>
                    <p className="font-semibold text-gray-900">{currentBooking.gender}</p>
                  </div>
                </div>

                {/* Số điện thoại */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                    <p className="font-semibold text-gray-900">{currentBooking.phoneNumber}</p>
                  </div>
                </div>

                {/* Bác sĩ */}
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bác sĩ</p>
                    <p className="font-semibold text-gray-900">{currentBooking.doctor}</p>
                  </div>
                </div>

                {/* Ngày khám */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ngày khám</p>
                    <p className="font-semibold text-gray-900">{formatDate(currentBooking.date)}</p>
                  </div>
                </div>

                {/* Giờ khám */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Giờ khám</p>
                    <p className="font-semibold text-gray-900">{currentBooking.time}</p>
                  </div>
                </div>

                {/* Triệu chứng */}
                {currentBooking.symptoms && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Triệu chứng</p>
                      <p className="font-semibold text-gray-900">{currentBooking.symptoms}</p>
                    </div>
                  </div>
                )}

                {/* Ghi chú */}
                {currentBooking.notes && (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ghi chú</p>
                      <p className="font-semibold text-gray-900">{currentBooking.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Amount */}
            <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Số tiền tạm ứng:</span>
                <span className="text-2xl font-bold text-green-600">100.000 VNĐ</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Số tiền này sẽ được thanh toán để giữ lịch hẹn của bạn
              </p>
            </div>

            {/* Warning Notice */}
            <div className="bg-amber-50 rounded-xl p-5 mb-6 border-2 border-amber-300 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">Lưu ý quan trọng</h3>
                  <p className="text-amber-800 font-medium">
                    Lịch đã đặt sẽ không thể hủy hoặc đổi ngày khám.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Phương thức thanh toán
              </h3>
              <div className="border border-blue-300 rounded-xl p-4 bg-blue-50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked
                    readOnly
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Ví MoMo</p>
                      <p className="text-sm text-gray-600">Thanh toán nhanh chóng, an toàn</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors"
              >
                Quay lại
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}