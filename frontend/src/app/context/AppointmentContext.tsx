import { createContext, useContext, useState, ReactNode } from "react";

export interface AppointmentData {
  fullName: string;
  dateOfBirth: string;
  gender: "Nam" | "Nữ";
  phoneNumber: string;
  doctor: string;
  date: string;
  time: string;
  symptoms: string;
  notes: string;
}

export interface Medication {
  name: string;
  dosage: string;
  usage: string;
  days: number;
}

export interface ExaminationData {
  examinationStatus?: "Chưa khám" | "Đang khám" | "Đã hoàn thành";
  primaryDiagnosis?: string;
  secondaryDiagnosis?: string;
  conclusion?: string;
  medications?: Medication[];
  examinationDate?: string;
}

export interface Appointment extends AppointmentData, ExaminationData {
  id: string;
  status: "Đã xác nhận" | "Đã hoàn tiền";
  orderCode: string;
  amount: number;
  createdAt: string;
}

export interface AppointmentContextType {
  currentBooking: AppointmentData | null;
  appointments: Appointment[];
  setCurrentBooking: (data: AppointmentData | null) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  updateAppointmentExamination: (id: string, data: ExaminationData) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [currentBooking, setCurrentBooking] = useState<AppointmentData | null>(null);
  
  // Initialize with demo data for today
  const today = new Date().toISOString().split("T")[0];
  const demoAppointments: Appointment[] = [
    {
      id: "demo-1",
      fullName: "Nguyễn Văn A",
      dateOfBirth: "1990-05-15",
      gender: "Nam",
      phoneNumber: "0901234567",
      doctor: "BS. Nguyễn Văn An",
      date: today,
      time: "08:00",
      symptoms: "Đau đầu, chóng mặt kéo dài 3 ngày",
      notes: "",
      status: "Đã xác nhận",
      orderCode: "ECO240329001",
      amount: 200000,
      createdAt: new Date().toISOString(),
      examinationStatus: "Chưa khám",
    },
    {
      id: "demo-2",
      fullName: "Trần Thị B",
      dateOfBirth: "1985-08-20",
      gender: "Nữ",
      phoneNumber: "0912345678",
      doctor: "BS. Nguyễn Văn An",
      date: today,
      time: "09:00",
      symptoms: "Đau bụng, buồn nôn",
      notes: "",
      status: "Đã xác nhận",
      orderCode: "ECO240329002",
      amount: 200000,
      createdAt: new Date().toISOString(),
      examinationStatus: "Chưa khám",
    },
    {
      id: "demo-3",
      fullName: "Lê Văn C",
      dateOfBirth: "1995-03-10",
      gender: "Nam",
      phoneNumber: "0923456789",
      doctor: "BS. Nguyễn Văn An",
      date: today,
      time: "10:00",
      symptoms: "Ho, sốt nhẹ",
      notes: "",
      status: "Đã xác nhận",
      orderCode: "ECO240329003",
      amount: 200000,
      createdAt: new Date().toISOString(),
      examinationStatus: "Đã hoàn thành",
      primaryDiagnosis: "Viêm đường hô hấp trên",
      secondaryDiagnosis: "",
      conclusion: "Bệnh nhân bị viêm đường hô hấp trên nhẹ. Uống thuốc theo đơn và nghỉ ngơi. Tái khám sau 3 ngày nếu không thuyên giảm.",
      medications: [
        {
          name: "Paracetamol 500mg",
          dosage: "1 viên",
          usage: "Uống khi sốt, ngày 3 lần sau ăn",
          days: 5,
        },
        {
          name: "Amoxicillin 500mg",
          dosage: "1 viên",
          usage: "Ngày 3 lần sau ăn",
          days: 7,
        },
      ],
      examinationDate: new Date().toISOString(),
    },
  ];
  
  const [appointments, setAppointments] = useState<Appointment[]>(demoAppointments);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [appointment, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const updateAppointmentExamination = (id: string, data: ExaminationData) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...data } : apt))
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        currentBooking,
        appointments,
        setCurrentBooking,
        addAppointment,
        updateAppointmentStatus,
        updateAppointmentExamination,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
}