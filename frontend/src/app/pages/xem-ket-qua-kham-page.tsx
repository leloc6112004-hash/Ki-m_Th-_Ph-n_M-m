import { ArrowLeft, FileText, Calendar, Clock, Stethoscope, Package, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { useMedicalRecord } from "../context/MedicalRecordContext";
import { useState } from "react";
import { MedicalRecordDetailModal } from "../components/medical-record-detail-modal";

interface MedicalRecord {
  id: string;
  appointmentId: string;
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
  prescription: Array<{
    name: string;
    dosage: string;
    usage: string;
    duration: string;
  }>;
  doctorNotes: string;
  status: "Đã hoàn thành";
  createdAt: string;
}

export default function XemKetQuaKhamPage() {
  const navigate = useNavigate();
  const { getMedicalRecordsByPatient } = useMedicalRecord();
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const records = getMedicalRecordsByPatient();

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleViewDetail = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRecord(null), 300);
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại</span>
        </button>

        {/* Header */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hồ sơ bệnh án
            </h1>
            <p className="text-gray-600">
              Xin chào! Theo dõi lịch sử khám bệnh và kết quả điều trị của bạn
            </p>
          </div>
        </div>

        {/* Records List */}
        <div className="max-w-5xl mx-auto">
          {records.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Bạn chưa có hồ sơ bệnh án nào
              </h3>
              <p className="text-gray-600 mb-6">
                Hồ sơ bệnh án sẽ được tạo sau khi bạn hoàn thành buổi khám với bác sĩ
              </p>
              <button
                onClick={() => navigate("/dat-lich-hen")}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Đặt lịch khám ngay
              </button>
            </div>
          ) : (
            // Records Timeline
            <div className="space-y-4">
              {records.map((record, index) => (
                <div
                  key={record.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-purple-500"
                >
                  {/* Timeline dot */}
                  {index !== records.length - 1 && (
                    <div className="absolute left-[-17px] top-16 w-8 h-8 bg-purple-500 rounded-full border-4 border-white shadow-md hidden md:block" />
                  )}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left: Main Info */}
                    <div className="flex-1 space-y-3">
                      {/* Date & Time */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold">{formatDate(record.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold">{record.time}</span>
                        </div>
                      </div>

                      {/* Doctor */}
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-900">{record.doctor}</span>
                      </div>

                      {/* Symptoms Preview */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Triệu chứng:</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {truncateText(record.initialSymptoms, 100)}
                        </p>
                      </div>

                      {/* Diagnosis Preview */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Chẩn đoán:</p>
                        <p className="text-purple-700 font-semibold">
                          {truncateText(record.mainDiagnosis, 80)}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-300">
                          {record.status}
                        </span>
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleViewDetail(record)}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                      >
                        <Eye className="w-5 h-5" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <MedicalRecordDetailModal
        record={selectedRecord}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}