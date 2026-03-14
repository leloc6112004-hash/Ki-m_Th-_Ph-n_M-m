import { Calendar, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AppointmentSection() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
            {/* Content */}
            <div className="p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Đặt Lịch Khám Ngay Hôm Nay
              </h2>
              <p className="text-base md:text-lg text-blue-100">
                Bắt đầu hành trình chăm sóc sức khỏe của bạn với hệ thống đặt lịch thông minh. 
                Kết nối với bác sĩ uy tín chỉ trong vài phút.
              </p>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full flex items-center justify-center mt-0.5 md:mt-1">
                    <span className="text-white text-xs md:text-sm">✓</span>
                  </div>
                  <div className="text-white">
                    <p className="font-medium text-sm md:text-base">Chọn bác sĩ và chuyên khoa phù hợp</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full flex items-center justify-center mt-0.5 md:mt-1">
                    <span className="text-white text-xs md:text-sm">✓</span>
                  </div>
                  <div className="text-white">
                    <p className="font-medium text-sm md:text-base">Chọn thời gian khám thuận tiện</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full flex items-center justify-center mt-0.5 md:mt-1">
                    <span className="text-white text-xs md:text-sm">✓</span>
                  </div>
                  <div className="text-white">
                    <p className="font-medium text-sm md:text-base">Nhận xác nhận ngay lập tức</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors shadow-lg text-base md:text-lg font-semibold">
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Đặt lịch khám ngay
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Image */}
            <div className="relative h-64 md:h-full md:min-h-[400px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762176211744-735731ee117b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwY2xpbmljJTIwbW9kZXJuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMDY2MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthcare clinic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}