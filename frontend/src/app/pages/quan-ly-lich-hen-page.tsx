import { ArrowLeft, Calendar, User, Phone, Stethoscope, Clock, FileText, MessageSquare, Package } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppointment } from "../context/AppointmentContext";

export default function QuanLyLichHenPage() {
  const navigate = useNavigate();
  const { appointments } = useAppointment();

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

  // Get status badge style
  const getStatusBadge = (status: string) => {
    const styles = {
      "Đã xác nhận": "bg-green-100 text-green-800 border-green-300",
      "Đã hoàn tiền": "bg-gray-100 text-gray-800 border-gray-300",
    };
    return styles[status as keyof typeof styles] || styles["Đã xác nhận"];
  };

  // Get status message
  const getStatusMessage = (status: string) => {
    const messages = {
      "Đã xác nhận": "Lịch hẹn của bạn đã được xác nhận. Vui lòng đến khám đúng giờ.",
      "Đã hoàn tiền": "Lịch hẹn đã bị hủy và tiền đã được hoàn trả",
    };
    return messages[status as keyof typeof messages] || messages["Đã xác nhận"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại</span>
        </button>

        {/* Header */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Lịch hẹn của bạn
            </h1>
            <p className="text-gray-600">
              Xin chào! Quản lý và theo dõi các lịch khám của bạn
            </p>
          </div>
        </div>

        {/* Appointments List */}
        <div className="max-w-5xl mx-auto">
          {appointments.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Chưa có lịch hẹn nào
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn chưa đặt lịch khám nào. Hãy đặt lịch hẹn với bác sĩ ngay!
              </p>
              <button
                onClick={() => navigate("/dat-lich-hen")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Đặt lịch khám ngay
              </button>
            </div>
          ) : (
            // Appointments Grid
            <div className="space-y-6">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow"
                >
                  {/* Status Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadge(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Mã: {appointment.orderCode}
                    </span>
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Họ tên */}
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                        <p className="font-semibold text-gray-900">{appointment.fullName}</p>
                      </div>
                    </div>

                    {/* Ngày sinh */}
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Ngày sinh</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(appointment.dateOfBirth).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>

                    {/* Giới tính */}
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Giới tính</p>
                        <p className="font-semibold text-gray-900">{appointment.gender}</p>
                      </div>
                    </div>

                    {/* Số điện thoại */}
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                        <p className="font-semibold text-gray-900">{appointment.phoneNumber}</p>
                      </div>
                    </div>

                    {/* Bác sĩ */}
                    <div className="flex items-start gap-3">
                      <Stethoscope className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Bác sĩ</p>
                        <p className="font-semibold text-gray-900">{appointment.doctor}</p>
                      </div>
                    </div>

                    {/* Ngày giờ */}
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Ngày giờ khám</p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(appointment.date)}
                        </p>
                        <p className="text-blue-600 font-bold flex items-center gap-1 mt-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Triệu chứng và Ghi chú */}
                  {(appointment.symptoms || appointment.notes) && (
                    <div className="border-t border-gray-200 pt-6 space-y-4">
                      {appointment.symptoms && (
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Triệu chứng</p>
                            <p className="text-gray-900">{appointment.symptoms}</p>
                          </div>
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Ghi chú</p>
                            <p className="text-gray-900">{appointment.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status Message */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 text-center font-medium">
                      {getStatusMessage(appointment.status)}
                    </p>
                  </div>

                  {/* Payment Info */}
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Số tiền đã thanh toán:</span>
                    <span className="font-bold text-green-600">
                      {appointment.amount.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}