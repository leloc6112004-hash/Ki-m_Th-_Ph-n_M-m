import { createContext, useContext, useState, ReactNode } from "react";

export interface DoctorUser {
  id: string;
  email: string;
  name: string;
  specialty: string;
  avatar?: string;
}

interface DoctorAuthContextType {
  doctor: DoctorUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const DoctorAuthContext = createContext<DoctorAuthContextType | undefined>(undefined);

export function DoctorAuthProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage
  const [doctor, setDoctor] = useState<DoctorUser | null>(() => {
    const stored = localStorage.getItem("doctorAuth");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string): boolean => {
    // Mock authentication - trim whitespace and compare
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    console.log("Login attempt:", { email: trimmedEmail, password: trimmedPassword });
    
    if (trimmedEmail === "Bacsi@gmail.com" && trimmedPassword === "Bacsi123@@") {
      const doctorData = {
        id: "doctor-001",
        email: "Bacsi@gmail.com",
        name: "BS. Nguyễn Văn An",
        specialty: "Nội khoa",
        avatar: undefined,
      };
      setDoctor(doctorData);
      // Persist to localStorage
      localStorage.setItem("doctorAuth", JSON.stringify(doctorData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setDoctor(null);
    // Clear localStorage
    localStorage.removeItem("doctorAuth");
  };

  const isAuthenticated = doctor !== null;

  return (
    <DoctorAuthContext.Provider value={{ doctor, login, logout, isAuthenticated }}>
      {children}
    </DoctorAuthContext.Provider>
  );
}

export function useDoctorAuth() {
  const context = useContext(DoctorAuthContext);
  if (!context) {
    throw new Error("useDoctorAuth must be used within DoctorAuthProvider");
  }
  return context;
}