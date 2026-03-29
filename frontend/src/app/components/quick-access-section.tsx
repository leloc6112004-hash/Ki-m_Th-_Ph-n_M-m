import { Calendar, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function QuickAccessSection() {
  const navigate = useNavigate();
  const { isAuthenticated, username } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const features = [
    {
      icon: Calendar,
      title: "Đặt lịch hẹn",
      description: "Đặt lịch khám bệnh nhanh chóng và tiện lợi",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      route: "/dat-lich-hen",
    },
    {
      icon: ClipboardList,
      title: "Xem kết quả khám",
      description: "Xem kết quả xét nghiệm và chẩn đoán",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      route: "/xem-ket-qua-kham",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        {/* Greeting */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Xin chào, {username}!
          </h2>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">
            Chúng tôi rất vui được phục vụ bạn. Hãy chọn dịch vụ bạn cần:
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(feature.route)}
                className={`${feature.color} ${feature.hoverColor} text-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left group`}
              >
                <div className="flex flex-col items-center text-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{feature.title}</h3>
                    <p className="text-white/90 text-xs md:text-sm">{feature.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}