import { Calendar, ArrowLeft, User, Phone, Stethoscope, Clock, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { useAppointment } from "../context";
import { toast } from "sonner";

// Mock API: Simulates slot availability checking
const checkSlotAvailability = (doctor: string, date: string, time: string): boolean => {
  if (!doctor || !date) return true; // If no doctor/date selected, show all as available
  
  // Simulate random availability (in production, this would be an API call)
  const key = `${doctor}-${date}-${time}`;
  const hash = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // 70% chance of being available
  // Add some time-based randomness to simulate slots filling up
  const randomFactor = Math.sin(Date.now() / 10000 + hash) * 0.3;
  return (hash % 10) / 10 + randomFactor > 0.3;
};

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function DatLichHenPage() {
  const navigate = useNavigate();
  const { setCurrentBooking } = useAppointment();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "" as "" | "Nam" | "Nữ",
    phoneNumber: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // List of doctors
  const doctors = [
    { id: "bs1", name: "BS. Nguyễn Văn An", specialty: "Nội khoa" },
    { id: "bs2", name: "BS. Trần Thị Bình", specialty: "Ngoại khoa" },
    { id: "bs3", name: "BS. Lê Hoàng Cường", specialty: "Tim mạch" },
    { id: "bs4", name: "BS. Phạm Minh Đức", specialty: "Da liễu" },
  ];

  // Base time slots
  const baseTimeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"
  ];

  // Update time slots availability
  const updateTimeSlots = useCallback(() => {
    const newTimeSlots: TimeSlot[] = baseTimeSlots.map(time => ({
      time,
      available: checkSlotAvailability(formData.doctor, formData.date, time)
    }));
    setTimeSlots(newTimeSlots);
  }, [formData.doctor, formData.date]);

  // Initial load and when doctor/date changes
  useEffect(() => {
    updateTimeSlots();
  }, [updateTimeSlots]);

  // Real-time polling (every 7 seconds)
  useEffect(() => {
    if (!formData.doctor || !formData.date) return;

    const interval = setInterval(() => {
      updateTimeSlots();
    }, 7000); // Poll every 7 seconds

    return () => clearInterval(interval);
  }, [formData.doctor, formData.date, updateTimeSlots]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Vui lòng nhập ngày sinh";
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
    } else if (!/^(03|05|07|08|09)\d{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    if (!formData.doctor) {
      newErrors.doctor = "Vui lòng chọn bác sĩ";
    }

    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày khám";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "Không thể chọn ngày trong quá khứ";
      }
    }

    if (!formData.time) {
      newErrors.time = "Vui lòng chọn giờ khám";
    } else {
      // Check if selected slot is still available
      const selectedSlot = timeSlots.find(slot => slot.time === formData.time);
      if (selectedSlot && !selectedSlot.available) {
        newErrors.time = "Khung giờ này vừa được đặt. Vui lòng chọn giờ khác.";
        toast.error("Khung giờ này vừa được đặt. Vui lòng chọn giờ khác.");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setCurrentBooking(formData);
      toast.success("Thông tin đã được lưu");
      navigate("/thanh-toan");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTimeSlotClick = (slot: TimeSlot) => {
    if (!slot.available) {
      toast.error("Khung giờ này đã đầy. Vui lòng chọn giờ khác.");
      return;
    }
    
    setFormData((prev) => ({ ...prev, time: slot.time }));
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại</span>
        </button>

        {/* Main Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Đặt lịch khám
              </h1>
              <p className="text-gray-600">
                Xin chào! Vui lòng điền thông tin để đặt lịch khám
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Họ và tên */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên đầy đủ"
                  className={`w-full px-4 py-3 border ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Giới tính */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Giới tính <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white`}
                >
                  <option value="">-- Chọn giới tính --</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className={`w-full px-4 py-3 border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Chọn bác sĩ */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  Chọn bác sĩ <span className="text-red-500">*</span>
                </label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.doctor ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white`}
                >
                  <option value="">-- Chọn bác sĩ --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
                {errors.doctor && (
                  <p className="text-red-500 text-sm mt-1">{errors.doctor}</p>
                )}
              </div>

              {/* Ngày khám */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Ngày khám <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              {/* Giờ khám - Visual Slot Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Giờ khám <span className="text-red-500">*</span>
                </label>
                
                {formData.doctor && formData.date ? (
                  <>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => handleTimeSlotClick(slot)}
                          disabled={!slot.available}
                          className={`relative px-4 py-3 rounded-lg border-2 font-semibold text-sm transition-all ${
                            formData.time === slot.time
                              ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                              : slot.available
                              ? "border-green-300 bg-green-50 text-green-700 hover:border-green-400 hover:bg-green-100"
                              : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-base">{slot.time}</span>
                            <div className="flex items-center gap-1">
                              {slot.available ? (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  <span className="text-xs">Còn chỗ</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3" />
                                  <span className="text-xs">Đã đầy</span>
                                </>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Real-time update indicator */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span>Trạng thái slot cập nhật tự động mỗi 7 giây</span>
                    </div>
                  </>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-700">
                      Vui lòng chọn bác sĩ và ngày khám để xem khung giờ có sẵn
                    </p>
                  </div>
                )}
                
                {errors.time && (
                  <p className="text-red-500 text-sm mt-2">{errors.time}</p>
                )}
              </div>

              {/* Triệu chứng */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Triệu chứng
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mô tả triệu chứng hiện tại (không bắt buộc)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Ghi chú */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Ghi chú
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Thêm ghi chú khác (không bắt buộc)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Tiếp tục
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
