import { Menu } from "lucide-react";
import { useState } from "react";
import { PatientSidebar } from "./patient-sidebar";

export function PatientOverlay() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Patient Sidebar */}
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Hamburger Menu Button - Top Left */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-[76px] md:top-20 left-4 z-50 w-11 h-11 md:w-12 md:h-12 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
        aria-label="Mở menu"
      >
        <Menu className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
      </button>
    </>
  );
}