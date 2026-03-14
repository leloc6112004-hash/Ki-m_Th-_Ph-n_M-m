import { Heart, Droplet, Baby, Ear, Stethoscope, Eye, Bone, Brain } from "lucide-react";

const specialties = [
  {
    icon: Heart,
    name: "Tim mạch",
    color: "bg-red-500"
  },
  {
    icon: Droplet,
    name: "Da liễu",
    color: "bg-pink-500"
  },
  {
    icon: Baby,
    name: "Nhi khoa",
    color: "bg-blue-500"
  },
  {
    icon: Ear,
    name: "Tai mũi họng",
    color: "bg-purple-500"
  },
  {
    icon: Stethoscope,
    name: "Nội tổng quát",
    color: "bg-green-500"
  },
  {
    icon: Eye,
    name: "Mắt",
    color: "bg-indigo-500"
  },
  {
    icon: Bone,
    name: "Xương khớp",
    color: "bg-orange-500"
  },
  {
    icon: Brain,
    name: "Thần kinh",
    color: "bg-teal-500"
  }
];

export function SpecialtiesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Chuyên Khoa
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Đa dạng chuyên khoa với đội ngũ bác sĩ chuyên môn cao
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 text-center space-y-2 md:space-y-4 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 ${specialty.color} rounded-xl md:rounded-2xl`}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-sm md:text-lg font-semibold text-gray-900">
                  {specialty.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}