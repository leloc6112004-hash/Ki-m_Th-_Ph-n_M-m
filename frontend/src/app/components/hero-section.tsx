import { Calendar, Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Đặt lịch khám nhanh chóng và tiện lợi
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Hệ thống đặt lịch khám bệnh trực tuyến hiện đại, giúp bạn kết nối với các bác sĩ uy tín 
              một cách dễ dàng và nhanh chóng. Tiết kiệm thời gian, tránh chờ đợi lâu.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
              <button className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-sm md:text-base">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                Đặt lịch hẹn ngay
              </button>
              <button className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl text-sm md:text-base">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                Tìm bác sĩ
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-8 pt-6 md:pt-8">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">5000+</div>
                <div className="text-xs md:text-sm text-gray-600">Bệnh nhân</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-green-600">50+</div>
                <div className="text-xs md:text-sm text-gray-600">Bác sĩ</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">15+</div>
                <div className="text-xs md:text-sm text-gray-600">Chuyên khoa</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first md:order-last">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwc21pbGluZ3xlbnwxfHx8fDE3NzMwNjYyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Doctor"
                className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white rounded-xl md:rounded-2xl shadow-xl p-3 md:p-4 max-w-[200px] md:max-w-xs">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">Đặt lịch dễ dàng</div>
                  <div className="text-xs md:text-sm text-gray-600">Chỉ trong vài phút</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}