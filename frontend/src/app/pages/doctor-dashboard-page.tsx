import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDoctorAuth, useAppointment } from "../context";
import DoctorLayout from "../components/DoctorLayout";
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Activity,
  Stethoscope
} from "lucide-react";

export default function DoctorDashboardPage() {
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
  
  // Filter confirmed appointments
  const confirmedAppointments = appointments.filter(
    apt => apt.status === "Đã xác nhận"
  );

  // Filter today's appointments
  const todayAppointments = confirmedAppointments.filter(
    apt => apt.date === today
  );

  // Count completed appointments
  const completedAppointments = appointments.filter(
    apt => apt.examinationStatus === "Đã hoàn thành"
  ).length;

  // Stats
  const stats = [
    {
      icon: Calendar,
      label: "Lịch hôm nay",
      value: todayAppointments.length,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      label: "Tổng bệnh nhân",
      value: confirmedAppointments.length,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: CheckCircle,
      label: "Đã hoàn thành",
      value: completedAppointments,
      color: "bg-emerald-100 text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Clock,
      label: "Chưa khám",
      value: todayAppointments.filter(apt => !apt.examinationStatus || apt.examinationStatus === "Chưa khám").length,
      color: "bg-gray-100 text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tổng quan
          </h1>
          <p className="text-gray-600">
            Chào mừng bạn quay trở lại! Đây là tổng quan hoạt động của bạn.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Lịch khám hôm nay
              </h2>
              <button
                onClick={() => navigate("/bacsi/lich-kham")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Xem tất cả →
              </button>
            </div>

            {todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments.slice(0, 3).map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{apt.fullName}</p>
                      <p className="text-sm text-gray-600">{apt.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      apt.examinationStatus === "Đã hoàn thành"
                        ? "bg-green-100 text-green-700"
                        : apt.examinationStatus === "Đang khám"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {apt.examinationStatus || "Chưa khám"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Không có lịch khám hôm nay</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Thống kê nhanh
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Lịch đã xác nhận</span>
                <span className="text-xl font-bold text-gray-900">
                  {confirmedAppointments.length}
                </span>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Đã khám xong</span>
                <span className="text-xl font-bold text-green-600">
                  {completedAppointments}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tỷ lệ hoàn thành</span>
                <span className="text-xl font-bold text-blue-600">
                  {confirmedAppointments.length > 0
                    ? Math.round((completedAppointments / confirmedAppointments.length) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/bacsi/lich-kham")}
            className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors text-left"
          >
            <Calendar className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Xem lịch khám</h3>
            <p className="text-sm opacity-90">Quản lý lịch khám hôm nay</p>
          </button>

          <button
            onClick={() => navigate("/bacsi/kham-benh")}
            className="bg-green-600 text-white p-6 rounded-2xl shadow-lg hover:bg-green-700 transition-colors text-left"
          >
            <Stethoscope className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Khám bệnh</h3>
            <p className="text-sm opacity-90">Bắt đầu khám bệnh nhân</p>
          </button>

          <button
            onClick={() => navigate("/bacsi/ho-so-benh-an")}
            className="bg-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:bg-emerald-700 transition-colors text-left"
          >
            <CheckCircle className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">Hồ sơ bệnh án</h3>
            <p className="text-sm opacity-90">Xem hồ sơ đã khám</p>
          </button>
        </div>
      </div>
    </DoctorLayout>
  );
}