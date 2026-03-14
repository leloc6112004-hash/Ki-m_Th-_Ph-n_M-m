import { Clock, Shield, Award, Calendar, UserCheck } from "lucide-react";

const advantages = [
  {
    icon: Calendar,
    title: "Đặt lịch hẹn nhanh chóng",
    description: "Đặt lịch khám bệnh chỉ trong vài bước đơn giản, tiết kiệm thời gian của bạn",
    color: "blue"
  },
  {
    icon: Clock,
    title: "Không phải chờ đợi",
    description: "Hệ thống quản lý lịch hẹn thông minh, giảm thiểu thời gian chờ đợi tại phòng khám",
    color: "green"
  },
  {
    icon: Shield,
    title: "Hệ thống minh bạch và công bằng",
    description: "Thông tin rõ ràng về bác sĩ, giá khám và dịch vụ, đảm bảo quyền lợi bệnh nhân",
    color: "blue"
  },
  {
    icon: Award,
    title: "Bác sĩ uy tín",
    description: "Đội ngũ bác sĩ giàu kinh nghiệm, được chứng nhận và có chuyên môn cao",
    color: "green"
  },
  {
    icon: UserCheck,
    title: "Quản lý lịch khám dễ dàng",
    description: "Theo dõi lịch sử khám bệnh, nhận thông báo nhắc lịch hẹn một cách tiện lợi",
    color: "blue"
  }
];

export function AdvantagesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Ưu Điểm Của Hệ Thống
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Chúng tôi mang đến trải nghiệm đặt lịch khám bệnh hiện đại và thuận tiện nhất
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            const bgColor = advantage.color === "blue" ? "bg-blue-600" : "bg-green-600";
            const cardBg = advantage.color === "blue" ? "bg-white" : "bg-white";
            
            return (
              <div
                key={index}
                className={`${cardBg} rounded-xl md:rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 ${bgColor} rounded-xl mb-3 md:mb-4`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1.5 md:mb-2">
                  {advantage.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}