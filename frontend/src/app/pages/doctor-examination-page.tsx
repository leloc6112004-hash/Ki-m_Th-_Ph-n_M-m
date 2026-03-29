import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDoctorAuth, useAppointment } from "../context";
import DoctorLayout from "../components/DoctorLayout";
import { 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  FileText, 
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  usage: string;
  days: string;
}

export default function DoctorExaminationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("id");
  
  const { isAuthenticated } = useDoctorAuth();
  const { appointments, updateAppointmentExamination } = useAppointment();

  const [formData, setFormData] = useState({
    primaryDiagnosis: "",
    secondaryDiagnosis: "",
    conclusion: "",
  });

  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "", dosage: "", usage: "", days: "" }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/bacsi/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Find the appointment
  const appointment = appointments.find(apt => apt.id === appointmentId);

  if (!appointment) {
    return (
      <DoctorLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Không tìm thấy lịch khám</h3>
          <p className="text-red-700 mb-4">Vui lòng chọn lịch khám từ danh sách</p>
          <button
            onClick={() => navigate("/bacsi/lich-kham")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Quay lại danh sách
          </button>
        </div>
      </DoctorLayout>
    );
  }

  // Common medications list
  const commonMedications = [
    "Paracetamol 500mg",
    "Amoxicillin 500mg",
    "Ibuprofen 400mg",
    "Vitamin C 1000mg",
    "Cetirizine 10mg",
    "Omeprazole 20mg",
    "Metformin 500mg",
    "Aspirin 100mg",
    "Losartan 50mg",
    "Atorvastatin 10mg",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setMedications(prev =>
      prev.map(med => (med.id === id ? { ...med, [field]: value } : med))
    );
  };

  const addMedication = () => {
    setMedications(prev => [
      ...prev,
      { id: Date.now().toString(), name: "", dosage: "", usage: "", days: "" }
    ]);
  };

  const removeMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(prev => prev.filter(med => med.id !== id));
    } else {
      toast.error("Phải có ít nhất một loại thuốc");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.primaryDiagnosis.trim()) {
      newErrors.primaryDiagnosis = "Vui lòng nhập chẩn đoán chính";
    }

    if (!formData.conclusion.trim()) {
      newErrors.conclusion = "Vui lòng nhập kết luận";
    }

    // Check medications
    const hasEmptyMedication = medications.some(
      med => !med.name || !med.dosage || !med.usage || !med.days
    );

    if (hasEmptyMedication) {
      newErrors.medications = "Vui lòng điền đầy đủ thông tin thuốc hoặc xóa dòng trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Update appointment with examination results
    updateAppointmentExamination(appointmentId!, {
      examinationStatus: "Đã hoàn thành",
      primaryDiagnosis: formData.primaryDiagnosis,
      secondaryDiagnosis: formData.secondaryDiagnosis,
      conclusion: formData.conclusion,
      medications: medications.map(med => ({
        name: med.name,
        dosage: med.dosage,
        usage: med.usage,
        days: parseInt(med.days),
      })),
      examinationDate: new Date().toISOString(),
    });

    toast.success("Đã lưu kết quả khám bệnh");
    navigate("/bacsi/lich-kham");
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/bacsi/lich-kham")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Khám bệnh</h1>
            <p className="text-gray-600">Nhập kết quả khám và kê đơn thuốc</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Patient Info */}
          <div className="lg:col-span-1 space-y-4">
            {/* Patient Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Thông tin bệnh nhân
              </h2>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Họ và tên</p>
                  <p className="font-semibold text-gray-900">{appointment.fullName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Ngày sinh</p>
                  <p className="text-gray-900">
                    {new Date(appointment.dateOfBirth).toLocaleDateString("vi-VN")}
                    <span className="text-gray-600 text-sm ml-2">
                      ({new Date().getFullYear() - new Date(appointment.dateOfBirth).getFullYear()} tuổi)
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Giới tính</p>
                  <p className="text-gray-900">{appointment.gender}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Số điện thoại
                  </p>
                  <p className="text-gray-900">{appointment.phoneNumber}</p>
                </div>
              </div>
            </div>

            {/* Appointment Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Thông tin lịch khám
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">{appointment.time}</span>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Ngày khám</p>
                  <p className="text-gray-900">
                    {new Date(appointment.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>

                {appointment.symptoms && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Triệu chứng ban đầu
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-900">{appointment.symptoms}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Examination Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Diagnosis Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Kết quả khám</h2>

              <div className="space-y-4">
                {/* Primary Diagnosis */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Chẩn đoán chính <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="primaryDiagnosis"
                    value={formData.primaryDiagnosis}
                    onChange={handleChange}
                    placeholder="Nhập chẩn đoán chính"
                    className={`w-full px-4 py-3 border ${
                      errors.primaryDiagnosis ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.primaryDiagnosis && (
                    <p className="text-red-500 text-sm mt-1">{errors.primaryDiagnosis}</p>
                  )}
                </div>

                {/* Secondary Diagnosis */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Chẩn đoán phụ (nếu có)
                  </label>
                  <input
                    type="text"
                    name="secondaryDiagnosis"
                    value={formData.secondaryDiagnosis}
                    onChange={handleChange}
                    placeholder="Nhập chẩn đoán phụ (không bắt buộc)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Conclusion */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Kết luận <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="conclusion"
                    value={formData.conclusion}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Nhập kết luận và lời khuyên cho bệnh nhân"
                    className={`w-full px-4 py-3 border ${
                      errors.conclusion ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  />
                  {errors.conclusion && (
                    <p className="text-red-500 text-sm mt-1">{errors.conclusion}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Prescription Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Đơn thuốc</h2>
                <button
                  onClick={addMedication}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Thêm thuốc
                </button>
              </div>

              {errors.medications && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-red-700">{errors.medications}</p>
                </div>
              )}

              <div className="space-y-4">
                {medications.map((medication, index) => (
                  <div
                    key={medication.id}
                    className="p-4 border border-gray-300 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Thuốc #{index + 1}</h3>
                      {medications.length > 1 && (
                        <button
                          onClick={() => removeMedication(medication.id)}
                          className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="md:col-span-2">
                        <label className="text-xs font-semibold text-gray-700 mb-1 block">
                          Tên thuốc <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={medication.name}
                          onChange={(e) => handleMedicationChange(medication.id, "name", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                        >
                          <option value="">-- Chọn thuốc --</option>
                          {commonMedications.map((med) => (
                            <option key={med} value={med}>
                              {med}
                            </option>
                          ))}
                          <option value="other">Thuốc khác...</option>
                        </select>
                        {medication.name === "other" && (
                          <input
                            type="text"
                            placeholder="Nhập tên thuốc"
                            onChange={(e) => handleMedicationChange(medication.id, "name", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-sm"
                          />
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-700 mb-1 block">
                          Liều lượng <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={medication.dosage}
                          onChange={(e) => handleMedicationChange(medication.id, "dosage", e.target.value)}
                          placeholder="VD: 1 viên"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-700 mb-1 block">
                          Số ngày <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={medication.days}
                          onChange={(e) => handleMedicationChange(medication.id, "days", e.target.value)}
                          placeholder="VD: 7"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="text-xs font-semibold text-gray-700 mb-1 block">
                          Cách dùng <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={medication.usage}
                          onChange={(e) => handleMedicationChange(medication.id, "usage", e.target.value)}
                          placeholder="VD: Uống sau ăn, ngày 2 lần"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => navigate("/bacsi/lich-kham")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Save className="w-5 h-5" />
                Hoàn thành khám
              </button>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}
