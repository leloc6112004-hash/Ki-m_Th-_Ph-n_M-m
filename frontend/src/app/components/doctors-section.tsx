import { Calendar, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const doctors = [
  {
    name: "BS. Nguyễn Thị Lan",
    specialty: "Tim mạch",
    experience: "15 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1659353887019-b142198f2668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZlbWFsZSUyMGRvY3RvciUyMHN0ZXRob3Njb3BlfGVufDF8fHx8MTc3MzA2NjI0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "BS. Trần Văn Minh",
    specialty: "Nội tổng quát",
    experience: "12 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1645066928295-2506defde470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwd2hpdGUlMjBjb2F0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzAzNjQ5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "BS. Lê Thu Hà",
    specialty: "Nhi khoa",
    experience: "10 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1753487050407-8e92c66d9af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBudXJzZSUyMG1lZGljYWwlMjB1bmlmb3JtfGVufDF8fHx8MTc3MzA2NjI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "BS. Phạm Quốc Hùng",
    specialty: "Da liễu",
    experience: "18 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1758691461513-88a0aef72160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBkb2N0b3IlMjBzcGVjaWFsaXN0JTIwbWVkaWNhbHxlbnwxfHx8fDE3NzMwNjYyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function DoctorsSection() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Đội Ngũ Bác Sĩ
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Đội ngũ bác sĩ chuyên nghiệp, tận tâm và giàu kinh nghiệm
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <ImageWithFallback
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-blue-600 text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                  Uy tín
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {doctor.name}
                </h3>
                
                <div className="flex items-center gap-2 text-blue-600">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">{doctor.specialty}</span>
                </div>
                
                <p className="text-sm text-gray-600">
                  {doctor.experience}
                </p>
                
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Calendar className="w-4 h-4" />
                  Đặt lịch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}