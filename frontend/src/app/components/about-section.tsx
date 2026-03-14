import { Target, Eye, Heart } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Về Chúng Tôi
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Ecommer Health cam kết mang đến dịch vụ chăm sóc sức khỏe chất lượng cao với 
            đội ngũ bác sĩ chuyên nghiệp và hệ thống đặt lịch hiện đại.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Mission */}
          <div className="bg-blue-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center space-y-3 md:space-y-4 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Sứ Mệnh</h3>
            <p className="text-sm md:text-base text-gray-600">
              Cung cấp dịch vụ y tế chất lượng cao, dễ tiếp cận và đáng tin cậy cho mọi người 
              thông qua công nghệ hiện đại.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-green-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center space-y-3 md:space-y-4 hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-600 rounded-full">
              <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Tầm Nhìn</h3>
            <p className="text-sm md:text-base text-gray-600">
              Trở thành nền tảng y tế hàng đầu Việt Nam, kết nối bệnh nhân với các chuyên gia 
              y tế uy tín nhất.
            </p>
          </div>

          {/* Commitment */}
          <div className="bg-blue-50 rounded-xl md:rounded-2xl p-6 md:p-8 text-center space-y-3 md:space-y-4 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Cam Kết</h3>
            <p className="text-sm md:text-base text-gray-600">
              Luôn đặt sức khỏe và sự hài lòng của bệnh nhân lên hàng đầu với dịch vụ 
              chăm sóc tận tâm và chuyên nghiệp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}