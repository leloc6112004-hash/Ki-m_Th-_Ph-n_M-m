import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDoctorAuth, useAppointment } from "../context";
import DoctorLayout from "../components/DoctorLayout";
import { FileText, User, Calendar, Phone, Pill, AlertCircle, Search } from "lucide-react";
import { useState } from "react";

export default function DoctorMedicalRecordsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useDoctorAuth();
  const { appointments } = useAppointment();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/bacsi/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Filter completed appointments
  const completedAppointments = appointments.filter(
    apt => apt.examinationStatus === "Đã hoàn thành"
  );

  // Filter by search query
  const filteredAppointments = completedAppointments.filter(apt =>
    apt.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.phoneNumber.includes(searchQuery) ||
    apt.primaryDiagnosis?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort by examination date (newest first)
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.examinationDate || a.date);
    const dateB = new Date(b.examinationDate || b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const [selectedRecord, setSelectedRecord] = useState<typeof appointments[0] | null>(null);

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hồ sơ bệnh án
          </h1>
          <p className="text-gray-600">
            Danh sách các bệnh nhân đã khám xong
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên, số điện thoại, hoặc chẩn đoán..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-100 rounded-lg px-4 py-3 border border-blue-200 flex items-center justify-between">
          <p className="text-sm text-blue-700">
            <span className="font-bold text-xl text-blue-900">{sortedAppointments.length}</span>
            <span className="ml-2">hồ sơ bệnh án</span>
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Records List */}
        {sortedAppointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {sortedAppointments.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1 space-y-4">
                    {/* Patient Info */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {record.fullName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {record.gender} - {new Date().getFullYear() - new Date(record.dateOfBirth).getFullYear()} tuổi
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {record.phoneNumber}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(record.examinationDate || record.date).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-xs font-semibold text-blue-700 mb-2">Chẩn đoán</p>
                      <p className="font-semibold text-gray-900">{record.primaryDiagnosis}</p>
                      {record.secondaryDiagnosis && (
                        <p className="text-sm text-gray-600 mt-1">({record.secondaryDiagnosis})</p>
                      )}
                    </div>

                    {/* Medications Preview */}
                    {record.medications && record.medications.length > 0 && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                          <Pill className="w-3 h-3" />
                          Đơn thuốc ({record.medications.length} loại)
                        </p>
                        <div className="space-y-1">
                          {record.medications.slice(0, 2).map((med, index) => (
                            <p key={index} className="text-sm text-gray-900">
                              • {med.name} - {med.dosage}
                            </p>
                          ))}
                          {record.medications.length > 2 && (
                            <p className="text-xs text-gray-600">
                              +{record.medications.length - 2} thuốc khác...
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Section: Action Button */}
                  <div className="lg:ml-4">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="w-full lg:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <FileText className="w-5 h-5" />
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "Không tìm thấy kết quả" : "Chưa có hồ sơ bệnh án"}
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Thử tìm kiếm với từ khóa khác"
                : "Chưa có bệnh nhân nào được khám xong"}
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Chi tiết hồ sơ bệnh án</h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Patient Information */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Thông tin bệnh nhân
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Họ và tên</p>
                    <p className="font-semibold text-gray-900">{selectedRecord.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Ngày sinh</p>
                    <p className="text-gray-900">
                      {new Date(selectedRecord.dateOfBirth).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Giới tính</p>
                    <p className="text-gray-900">{selectedRecord.gender}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Số điện thoại</p>
                    <p className="text-gray-900">{selectedRecord.phoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Thông tin khám
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Ngày khám</p>
                    <p className="text-gray-900">
                      {new Date(selectedRecord.examinationDate || selectedRecord.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Giờ khám</p>
                    <p className="text-gray-900">{selectedRecord.time}</p>
                  </div>
                </div>
              </div>

              {/* Initial Symptoms */}
              {selectedRecord.symptoms && (
                <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Triệu chứng ban đầu
                  </h3>
                  <p className="text-gray-900">{selectedRecord.symptoms}</p>
                </div>
              )}

              {/* Diagnosis */}
              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Kết quả khám
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Chẩn đoán chính</p>
                    <p className="font-semibold text-gray-900">{selectedRecord.primaryDiagnosis}</p>
                  </div>
                  {selectedRecord.secondaryDiagnosis && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Chẩn đoán phụ</p>
                      <p className="text-gray-900">{selectedRecord.secondaryDiagnosis}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Kết luận</p>
                    <p className="text-gray-900">{selectedRecord.conclusion}</p>
                  </div>
                </div>
              </div>

              {/* Prescription */}
              {selectedRecord.medications && selectedRecord.medications.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-purple-600" />
                    Đơn thuốc
                  </h3>
                  <div className="space-y-3">
                    {selectedRecord.medications.map((med, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                        <p className="font-semibold text-gray-900 mb-2">
                          {index + 1}. {med.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Liều lượng: </span>
                            <span className="text-gray-900 font-medium">{med.dosage}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Số ngày: </span>
                            <span className="text-gray-900 font-medium">{med.days} ngày</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-600">Cách dùng: </span>
                            <span className="text-gray-900 font-medium">{med.usage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </DoctorLayout>
  );
}
