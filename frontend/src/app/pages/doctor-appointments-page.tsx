import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDoctorAuth, useAppointment } from "../context";
import DoctorLayout from "../components/DoctorLayout";
import { Calendar, Clock, User, Phone, FileText, ArrowRight, Activity } from "lucide-react";

export default function DoctorAppointmentsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useDoctorAuth();
  const { appointments } = useAppointment();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/bacsi/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Filter today's confirmed appointments
  const todayAppointments = appointments.filter(
    apt => apt.status === "Đã xác nhận" && apt.date === today
  );

  // Sort by time
  const sortedAppointments = todayAppointments.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Đã hoàn thành":
        return "bg-green-100 text-green-700 border-green-200";
      case "Đang khám":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status?: string) => {
    return status || "Chưa khám";
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Lịch khám hôm nay
            </h1>
            <p className="text-gray-600">
              {new Date().toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Summary Badge */}
          <div className="bg-blue-100 rounded-lg px-4 py-2 border border-blue-200">
            <p className="text-sm text-blue-700">
              <span className="font-bold text-2xl text-blue-900">{sortedAppointments.length}</span>
              <span className="ml-2">lịch khám</span>
            </p>
          </div>
        </div>

        {/* Appointments List */}
        {sortedAppointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {sortedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Section: Patient Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {appointment.fullName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {appointment.gender} - {new Date().getFullYear() - new Date(appointment.dateOfBirth).getFullYear()} tuổi
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {appointment.phoneNumber}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(appointment.examinationStatus)}`}>
                        {getStatusText(appointment.examinationStatus)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg font-semibold">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(appointment.date).toLocaleDateString("vi-VN")}
                      </span>
                    </div>

                    {/* Symptoms */}
                    {appointment.symptoms && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Triệu chứng ban đầu:
                        </p>
                        <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Section: Action Button */}
                  <div className="lg:ml-4">
                    {appointment.examinationStatus === "Đã hoàn thành" ? (
                      <button
                        onClick={() => navigate(`/bacsi/ho-so-benh-an?id=${appointment.id}`)}
                        className="w-full lg:w-auto px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
                      >
                        <FileText className="w-5 h-5" />
                        Xem hồ sơ
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/bacsi/kham-benh?id=${appointment.id}`)}
                        className="w-full lg:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
                      >
                        {appointment.examinationStatus === "Đang khám" ? "Tiếp tục khám" : "Bắt đầu khám"}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không có lịch khám hôm nay
            </h3>
            <p className="text-gray-600">
              Hiện tại chưa có bệnh nhân nào đặt lịch khám cho hôm nay
            </p>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
}
