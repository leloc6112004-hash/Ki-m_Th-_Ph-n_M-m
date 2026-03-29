import { createContext, useContext, useState, ReactNode } from "react";

export interface Medication {
  name: string;
  dosage: string;
  usage: string;
  duration: string;
}

export interface MedicalRecord {
  id: string;
  appointmentId: string;
  date: string;
  time: string;
  doctor: string;
  
  // Patient information (immutable)
  patientName: string;
  dateOfBirth: string;
  gender: "Nam" | "Nữ";
  phoneNumber: string;
  
  // From patient booking
  initialSymptoms: string;
  
  // From doctor input
  mainDiagnosis: string;
  subDiagnosis: string;
  doctorConclusion: string;
  prescription: Medication[];
  doctorNotes: string;
  
  status: "Đã hoàn thành";
  createdAt: string;
}

export interface MedicalRecordContextType {
  medicalRecords: MedicalRecord[];
  addMedicalRecord: (record: MedicalRecord) => void;
  getMedicalRecordsByPatient: () => MedicalRecord[];
}

const MedicalRecordContext = createContext<MedicalRecordContextType | undefined>(undefined);

// Mock data for demo
const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "mr001",
    appointmentId: "apt001",
    date: "2026-03-25",
    time: "09:00",
    doctor: "BS. Nguyễn Văn An",
    patientName: "Bệnh nhân",
    dateOfBirth: "1980-01-01",
    gender: "Nam",
    phoneNumber: "0912345678",
    initialSymptoms: "Đau đầu, chóng mặt, mệt mỏi kéo dài 3 ngày. Cảm thấy buồn nôn nhẹ vào buổi sáng.",
    mainDiagnosis: "Thiếu máu não do huyết áp thấp",
    subDiagnosis: "Thiếu vitamin B12",
    doctorConclusion: "Bệnh nhân có triệu chứng thiếu máu não do huyết áp thấp kết hợp với thiếu vitamin. Cần điều chỉnh chế độ dinh dưỡng, tăng cường rau xanh, thịt đỏ. Tránh đứng dậy đột ngột. Tái khám sau 2 tuần.",
    prescription: [
      {
        name: "Vitamin B12",
        dosage: "500mcg",
        usage: "Uống 1 viên/ngày sau ăn sáng",
        duration: "30 ngày",
      },
      {
        name: "Sắt Fumarate",
        dosage: "200mg",
        usage: "Uống 1 viên/ngày sau ăn trưa",
        duration: "30 ngày",
      },
      {
        name: "Paracetamol",
        dosage: "500mg",
        usage: "Uống khi đau đầu, tối đa 3 viên/ngày",
        duration: "7 ngày",
      },
    ],
    doctorNotes: "Theo dõi huyết áp hàng ngày. Nếu xuất hiện triệu chứng chóng mặt dữ dội, buồn nôn nhiều, đến bệnh viện ngay. Tránh vận động mạnh. Ngủ đủ 8 tiếng/ngày.",
    status: "Đã hoàn thành",
    createdAt: "2026-03-25T09:30:00Z",
  },
  {
    id: "mr002",
    appointmentId: "apt002",
    date: "2026-03-20",
    time: "14:00",
    doctor: "BS. Trần Thị Bình",
    patientName: "Bệnh nhân",
    dateOfBirth: "1985-05-15",
    gender: "Nữ",
    phoneNumber: "0912345678",
    initialSymptoms: "Ho khan, đau họng, sốt nhẹ 37.8°C. Mệt mỏi, ăn uống kém.",
    mainDiagnosis: "Viêm họng cấp do virus",
    subDiagnosis: "",
    doctorConclusion: "Viêm họng do virus, không cần kháng sinh. Nghỉ ngơi, uống nhiều nước ấm, súc miệng nước muối. Tránh đồ lạnh, cay nóng. Khỏi sau 5-7 ngày.",
    prescription: [
      {
        name: "Strepsils",
        dosage: "1 viên",
        usage: "Ngậm khi đau họng, tối đa 8 viên/ngày",
        duration: "5 ngày",
      },
      {
        name: "Paracetamol",
        dosage: "500mg",
        usage: "Uống khi sốt >38°C, cách 6 giờ/lần",
        duration: "3 ngày",
      },
    ],
    doctorNotes: "Uống nhiều nước ấm, chanh mật ong. Súc miệng nước muối 3 lần/ngày. Nếu sốt >38.5°C hoặc ho có đàm vàng xanh, quay lại khám.",
    status: "Đã hoàn thành",
    createdAt: "2026-03-20T14:30:00Z",
  },
  {
    id: "mr003",
    appointmentId: "apt003",
    date: "2026-03-15",
    time: "10:30",
    doctor: "BS. Lê Hoàng Cường",
    patientName: "Bệnh nhân",
    dateOfBirth: "1990-08-20",
    gender: "Nam",
    phoneNumber: "0912345678",
    initialSymptoms: "Đau bụng dưới, đi ngoài phân lỏng 4-5 lần/ngày. Buồn nôn.",
    mainDiagnosis: "Viêm đại tràng cấp",
    subDiagnosis: "Rối loạn tiêu hóa",
    doctorConclusion: "Viêm đại tràng cấp do nhiễm khuẩn nhẹ hoặc ăn uống không hợp vệ sinh. Cần ăn nhạt, uống nhiều nước. Tránh đồ cay, dầu mỡ. Tái khám nếu không đỡ sau 3 ngày.",
    prescription: [
      {
        name: "Normix 200mg",
        dosage: "200mg",
        usage: "Uống 2 viên x 2 lần/ngày sau ăn",
        duration: "7 ngày",
      },
      {
        name: "Smecta",
        dosage: "1 gói",
        usage: "Pha nước uống 3 lần/ngày trước ăn",
        duration: "5 ngày",
      },
      {
        name: "Buscopan",
        dosage: "10mg",
        usage: "Uống khi đau bụng, tối đa 3 viên/ngày",
        duration: "5 ngày",
      },
    ],
    doctorNotes: "Ăn cháo, súp, tránh rau sống. Uống oresol để bù nước điện giải. Vệ sinh tay sạch sẽ. Nếu đi ngoài ra máu hoặc sốt cao, đến bệnh viện ngay.",
    status: "Đã hoàn thành",
    createdAt: "2026-03-15T11:00:00Z",
  },
];

export function MedicalRecordProvider({ children }: { children: ReactNode }) {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(mockMedicalRecords);

  const addMedicalRecord = (record: MedicalRecord) => {
    setMedicalRecords((prev) => [record, ...prev]);
  };

  const getMedicalRecordsByPatient = () => {
    // In production, filter by patient ID
    return medicalRecords;
  };

  return (
    <MedicalRecordContext.Provider
      value={{
        medicalRecords,
        addMedicalRecord,
        getMedicalRecordsByPatient,
      }}
    >
      {children}
    </MedicalRecordContext.Provider>
  );
}

export function useMedicalRecord() {
  const context = useContext(MedicalRecordContext);
  if (context === undefined) {
    throw new Error("useMedicalRecord must be used within a MedicalRecordProvider");
  }
  return context;
}