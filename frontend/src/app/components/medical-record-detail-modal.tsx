import { X, User, Calendar, Clock, Stethoscope, FileText, Pill, MessageSquare, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface Medication {
  name: string;
  dosage: string;
  usage: string;
  duration: string;
}

interface MedicalRecord {
  id: string;
  date: string;
  time: string;
  doctor: string;
  patientName: string;
  dateOfBirth: string;
  gender: "Nam" | "Nữ";
  phoneNumber: string;
  initialSymptoms: string;
  mainDiagnosis: string;
  subDiagnosis: string;
  doctorConclusion: string;
  prescription: Medication[];
  doctorNotes: string;
  status: "Đã hoàn thành";
}

interface MedicalRecordDetailModalProps {
  record: MedicalRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MedicalRecordDetailModal({ record, isOpen, onClose }: MedicalRecordDetailModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!record) return null;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Chi tiết hồ sơ bệnh án</h2>
                    <p className="text-sm text-gray-600">Mã hồ sơ: {record.id}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Đóng"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* 1. THÔNG TIN BỆNH NHÂN (IMPORTANT - READ ONLY) */}
                <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border-2 border-green-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-green-600" />
                    Thông tin bệnh nhân
                    <span className="ml-auto text-xs bg-green-200 text-green-800 px-3 py-1 rounded-full font-semibold">
                      Chỉ đọc
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Họ và tên</p>
                        <p className="font-semibold text-gray-900">{record.patientName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Ngày sinh</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(record.dateOfBirth).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Giới tính</p>
                        <p className="font-semibold text-gray-900">{record.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Số điện thoại</p>
                        <p className="font-semibold text-gray-900">{record.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. THÔNG TIN KHÁM */}
                <section className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Thông tin khám
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Ngày khám</p>
                        <p className="font-semibold text-gray-900">{formatDate(record.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Giờ khám</p>
                        <p className="font-semibold text-gray-900">{record.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Stethoscope className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Bác sĩ</p>
                        <p className="font-semibold text-gray-900">{record.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Trạng thái</p>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-300">
                          {record.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Triệu chứng ban đầu */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    Triệu chứng ban đầu
                  </h3>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <p className="text-gray-900 leading-relaxed">{record.initialSymptoms}</p>
                  </div>
                </section>

                {/* 4. Kết quả khám */}
                <section className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                    Kết quả khám
                  </h3>
                  <div className="space-y-4">
                    {/* Chẩn đoán chính */}
                    <div>
                      <p className="text-sm font-semibold text-purple-700 mb-2">Chẩn đoán chính</p>
                      <p className="text-gray-900 font-semibold text-lg">{record.mainDiagnosis}</p>
                    </div>

                    {/* Chẩn đoán phụ */}
                    {record.subDiagnosis && (
                      <div>
                        <p className="text-sm font-semibold text-purple-700 mb-2">Chẩn đoán phụ</p>
                        <p className="text-gray-900">{record.subDiagnosis}</p>
                      </div>
                    )}

                    {/* Kết luận */}
                    <div>
                      <p className="text-sm font-semibold text-purple-700 mb-2">Kết luận của bác sĩ</p>
                      <p className="text-gray-900 leading-relaxed">{record.doctorConclusion}</p>
                    </div>
                  </div>
                </section>

                {/* 5. Đơn thuốc */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-green-600" />
                    Đơn thuốc
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-green-50 border-b-2 border-green-200">
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Tên thuốc</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Liều lượng</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Cách dùng</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Số ngày dùng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.prescription.map((med, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 font-semibold text-gray-900">{med.name}</td>
                            <td className="px-4 py-3 text-gray-700">{med.dosage}</td>
                            <td className="px-4 py-3 text-gray-700">{med.usage}</td>
                            <td className="px-4 py-3 text-gray-700">{med.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 6. Ghi chú bác sĩ */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Ghi chú bác sĩ
                  </h3>
                  <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-yellow-400">
                    <p className="text-gray-900 leading-relaxed">{record.doctorNotes}</p>
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
                <button
                  onClick={onClose}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Đóng
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}