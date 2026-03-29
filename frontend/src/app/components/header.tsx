import { Heart, Calendar, FileText, ClipboardList, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-lg">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-800">Ecommer Health</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {isAuthenticated ? (
              <>
                {/* User Greeting */}
                <span className="text-gray-700 font-medium text-sm xl:text-base mr-2">
                  Xin chào!
                </span>

                {/* Feature Buttons */}
                <button
                  onClick={() => navigate("/dat-lich-hen")}
                  className="flex items-center gap-1.5 px-3 xl:px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md hover:shadow-lg text-sm xl:text-base"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Đặt lịch hẹn</span>
                </button>

                <button
                  onClick={() => navigate("/xem-ket-qua-kham")}
                  className="flex items-center gap-1.5 px-3 xl:px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors shadow-md hover:shadow-lg text-sm xl:text-base"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Xem kết quả khám</span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 xl:px-4 py-2 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm xl:text-base"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 xl:px-6 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm xl:text-base"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 xl:px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm xl:text-base"
                >
                  Đăng ký
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              {isAuthenticated ? (
                <div className="space-y-4">
                  {/* User Greeting */}
                  <div className="text-center pb-4 border-b border-gray-200">
                    <p className="text-gray-600 text-sm">Xin chào,</p>
                    <p className="text-blue-600 font-semibold text-lg">{username}</p>
                  </div>

                  {/* Feature Buttons */}
                  <button
                    onClick={() => {
                      navigate("/dat-lich-hen");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-md"
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Đặt lịch hẹn</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/xem-ket-qua-kham");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors shadow-md"
                  >
                    <ClipboardList className="w-5 h-5" />
                    <span className="font-medium">Xem kết quả khám</span>
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors mt-6"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}