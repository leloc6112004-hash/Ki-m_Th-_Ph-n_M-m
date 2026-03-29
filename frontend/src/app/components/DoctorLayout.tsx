import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDoctorAuth } from "../context";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  LogOut,
  User,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DoctorLayoutProps {
  children: ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, logout } = useDoctorAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất");
    navigate("/bacsi/login");
  };

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: "Tổng quan", 
      path: "/bacsi/dashboard" 
    },
    { 
      icon: Calendar, 
      label: "Lịch khám hôm nay", 
      path: "/bacsi/lich-kham" 
    },
    { 
      icon: FileText, 
      label: "Hồ sơ bệnh án", 
      path: "/bacsi/ho-so-benh-an" 
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Get current date
  const currentDate = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Top Bar */}
      <div className="bg-white shadow-md sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {/* Date */}
          <div className="hidden md:block text-sm text-gray-600">
            {currentDate}
          </div>

          {/* Doctor Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-gray-900">{doctor?.name}</p>
              <p className="text-sm text-gray-600">{doctor?.specialty}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-0 left-0 h-screen bg-white shadow-xl z-10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } w-64`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Ecommer</h2>
                  <p className="text-xs text-gray-600">Hệ thống Bác sĩ</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}