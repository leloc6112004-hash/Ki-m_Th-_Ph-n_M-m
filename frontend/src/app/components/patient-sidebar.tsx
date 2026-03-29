import { Calendar, List, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface PatientSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PatientSidebar({ isOpen, onClose }: PatientSidebarProps) {
  const navigate = useNavigate();

  // Close sidebar on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const menuItems = [
    {
      id: 1,
      title: "Đặt lịch hẹn",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
      path: "/dat-lich-hen",
    },
    {
      id: 2,
      title: "Quản lý lịch hẹn",
      icon: List,
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverBg: "hover:bg-green-100",
      path: "/quan-ly-lich-hen",
    },
    {
      id: 3,
      title: "Hồ sơ bệnh án",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
      path: "/xem-ket-qua-kham",
    },
  ];

  const handleMenuClick = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-[60]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-[280px] sm:w-80 bg-white shadow-2xl z-[70] overflow-y-auto"
          >
            {/* Sidebar Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Menu Bệnh Nhân</h2>
                <p className="text-blue-100 text-sm mt-1">Quản lý sức khỏe của bạn</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Đóng menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${item.bgColor} ${item.hoverBg} shadow-sm hover:shadow-md border border-transparent hover:border-gray-200`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span className={`text-base font-semibold ${item.color}`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sidebar Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 to-transparent border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center font-medium">
                Ecommer Health
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                Chăm sóc sức khỏe toàn diện
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}