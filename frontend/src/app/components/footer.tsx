import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Heart, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router";

export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
              </div>
              <span className="text-lg md:text-xl font-semibold text-white">Ecommer Health</span>
            </div>
            <p className="text-xs md:text-sm">
              Hệ thống đặt lịch khám bệnh trực tuyến hàng đầu Việt Nam, kết nối bạn với các bác sĩ uy tín.
            </p>
            <div className="text-xs md:text-sm">
              <p className="font-semibold text-white">Thành lập: 2020</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-white">Liên Hệ</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-medium text-white">Hotline</p>
                  <p className="text-xs md:text-sm">1900 8888</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-medium text-white">Email</p>
                  <p className="text-xs md:text-sm break-all">contact@ecommerhealth.vn</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-medium text-white">Địa chỉ</p>
                  <p className="text-xs md:text-sm">123 Nguyễn Huệ, Q.1, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Branches */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-white">Chi Nhánh</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 flex-shrink-0" />
                Chi nhánh Hà Nội
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 flex-shrink-0" />
                Chi nhánh Đà Nẵng
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 flex-shrink-0" />
                Chi nhánh Cần Thơ
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 flex-shrink-0" />
                Chi nhánh Nha Trang
              </li>
            </ul>
          </div>

          {/* Quick Links & Social */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-white">Theo Dõi Chúng Tôi</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-2">Giờ Làm Việc</h4>
              <p className="text-sm">Thứ 2 - Thứ 6: 8:00 - 20:00</p>
              <p className="text-sm">Thứ 7 - CN: 8:00 - 17:00</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left">© {currentYear} Ecommer Health. All rights reserved.</p>
            
            {/* Doctor Portal Link */}
            <button
              onClick={() => navigate("/bacsi/login")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              <Stethoscope className="w-4 h-4" />
              Đăng nhập Bác sĩ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}