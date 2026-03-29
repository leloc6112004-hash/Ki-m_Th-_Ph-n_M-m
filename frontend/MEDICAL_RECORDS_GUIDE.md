# 🏥 Hồ sơ bệnh án (Medical Records) - Ecommer Health

## 📋 Tổng quan

Tính năng "Hồ sơ bệnh án" cho phép bệnh nhân xem lại toàn bộ lịch sử khám bệnh, kết quả chẩn đoán, đơn thuốc và ghi chú từ bác sĩ sau mỗi lần khám hoàn thành.

---

## 🎯 Mục đích

### **Cho Bệnh nhân:**
- ✅ Theo dõi lịch sử khám bệnh đầy đủ
- ✅ Xem lại chẩn đoán và đơn thuốc
- ✅ Lưu trữ thông tin y tế cá nhân
- ✅ Dễ dàng tra cứu khi cần

### **Cho Hệ thống:**
- ✅ Minh bạch thông tin y tế
- ✅ Tăng độ tin cậy
- ✅ Hỗ trợ tái khám
- ✅ Quản lý dữ liệu tốt hơn

---

## 🔐 Quyền truy cập

### **Bệnh nhân (Patient):**
- ✅ READ-ONLY (Chỉ đọc)
- ✅ Xem toàn bộ hồ sơ của mình
- ❌ KHÔNG thể chỉnh sửa
- ❌ KHÔNG thể xóa

### **Bác sĩ (Doctor):**
- ✅ Tạo hồ sơ sau khi khám xong
- ✅ Nhập chẩn đoán, đơn thuốc, ghi chú
- ✅ Cập nhật nếu cần (trong 24h)

---

## 📱 Giao diện chính

### **1. DANH SÁCH HỒ SƠ (List View)**

**URL:** `/xem-ket-qua-kham`

**Layout:**
- Timeline vertical (mới nhất ở trên)
- Card-based design
- Border-left màu purple (medical theme)
- Shadow effect on hover

**Mỗi card hiển thị:**

```
┌─────────────────────────────────────────┐
│ 🟣  [Ngày]  [Giờ]                      │
│    BS. Tên Bác Sĩ                      │
│                                         │
│    Triệu chứng: [preview 1-2 dòng]    │
│    Chẩn đoán: [preview ngắn]          │
│                                         │
│    [Đã hoàn thành]  [Xem chi tiết] ──►│
└─────────────────────────────────────────┘
```

**Features:**
- ✅ Auto-truncate text (show more on hover)
- ✅ Timeline dots (purple)
- ✅ Responsive grid
- ✅ Smooth hover effects

---

### **2. CHI TIẾT HỒ SƠ (Detail Modal)**

**Trigger:** Click button "Xem chi tiết"

**Format:** Modal popup (overlay)

**Sections:**

#### **A. Thông tin chung** (Blue background)
```
👤 Thông tin chung
─────────────────────────────
📅 Ngày khám: Thứ Sáu, 25 tháng 3, 2026
🕐 Giờ khám: 09:00
🩺 Bác sĩ: BS. Nguyễn Văn An
✓ Trạng thái: Đã hoàn thành
```

#### **B. Triệu chứng ban đầu** (Orange background)
```
📄 Triệu chứng ban đầu
─────────────────────────────
[Full text từ form đặt lịch]
Ví dụ: "Đau đầu, chóng mặt, mệt mỏi kéo dài 3 ngày..."
```

#### **C. Kết quả khám** (Purple background) ⭐ **QUAN TRỌNG**
```
🩺 Kết quả khám
─────────────────────────────
Chẩn đoán chính:
→ Thiếu máu não do huyết áp thấp

Chẩn đoán phụ:
→ Thiếu vitamin B12

Kết luận của bác sĩ:
→ Bệnh nhân có triệu chứng thiếu máu não...
  Cần điều chỉnh dinh dưỡng...
  Tái khám sau 2 tuần.
```

#### **D. Đơn thuốc** (Table format)
```
💊 Đơn thuốc
─────────────────────────────────────────────────────
| Tên thuốc      | Liều lượng | Cách dùng          | Số ngày |
|────────────────|────────────|─────────────────────|─────────|
| Vitamin B12    | 500mcg     | 1 viên/ngày s.ăn   | 30 ngày |
| Sắt Fumarate   | 200mg      | 1 viên/ngày s.trưa | 30 ngày |
| Paracetamol    | 500mg      | Khi đau đầu        | 7 ngày  |
─────────────────────────────────────────────────────
```

#### **E. Ghi chú bác sĩ** (Yellow background - highlight)
```
💬 Ghi chú bác sĩ
─────────────────────────────
⚠️ Theo dõi huyết áp hàng ngày
⚠️ Tránh vận động mạnh
⚠️ Ngủ đủ 8 tiếng/ngày
⚠️ Nếu chóng mặt dữ dội → đến BV ngay
```

**Modal Features:**
- ✅ ESC key to close
- ✅ Click outside to close
- ✅ Scroll within modal
- ✅ Sticky header & footer
- ✅ Smooth animations (Motion)
- ✅ Mobile responsive

---

## 🗂️ Cấu trúc dữ liệu

### **MedicalRecord Interface:**

```typescript
interface MedicalRecord {
  id: string;              // Mã hồ sơ
  appointmentId: string;   // Link với appointment
  
  // Thông tin cơ bản
  date: string;            // Ngày khám
  time: string;            // Giờ khám
  doctor: string;          // Bác sĩ
  patientName: string;     // Tên BN
  phoneNumber: string;     // SĐT
  
  // Từ bệnh nhân (booking)
  initialSymptoms: string; // Triệu chứng ban đầu
  
  // Từ bác sĩ (sau khám)
  mainDiagnosis: string;   // Chẩn đoán chính
  subDiagnosis: string;    // Chẩn đoán phụ
  doctorConclusion: string;// Kết luận
  prescription: Medication[]; // Đơn thuốc
  doctorNotes: string;     // Ghi chú
  
  // Metadata
  status: "Đã hoàn thành";
  createdAt: string;       // Timestamp
}

interface Medication {
  name: string;      // Tên thuốc
  dosage: string;    // Liều lượng
  usage: string;     // Cách dùng
  duration: string;  // Số ngày
}
```

---

## 🔄 Data Flow

### **Luồng tạo hồ sơ:**

```
1. Bệnh nhân đặt lịch
   └─ Nhập triệu chứng (initialSymptoms)
        ↓
2. Bác sĩ duyệt lịch
   └─ Status = "Đã chấp nhận"
        ↓
3. Bệnh nhân đến khám
   └─ Bác sĩ thăm khám
        ↓
4. Bác sĩ nhập kết quả khám
   ├─ Chẩn đoán chính/phụ
   ├─ Kết luận
   ├─ Đơn thuốc
   └─ Ghi chú
        ↓
5. Hệ thống tạo Medical Record
   └─ Link với appointmentId
        ↓
6. Bệnh nhân xem được trong "Hồ sơ bệnh án"
```

### **Điều kiện hiển thị:**

```
Medical Record được tạo KHI:
✅ Appointment status = "Completed"
✅ Doctor đã nhập đầy đủ thông tin
✅ Record được lưu vào database

Medical Record KHÔNG hiển thị KHI:
❌ Appointment status = "Chờ duyệt"
❌ Appointment status = "Đã chấp nhận" (chưa khám)
❌ Appointment status = "Bị từ chối"
```

---

## 🎨 Design System

### **Color Coding:**

```css
/* Section Colors */
Thông tin chung: Blue (#3B82F6)
Triệu chứng: Orange (#F97316)
Kết quả khám: Purple (#A855F7)
Đơn thuốc: Green (#22C55E)
Ghi chú: Yellow (#EAB308)

/* Status Badge */
Đã hoàn thành: Green background (#22C55E)
```

### **Icons:**

```
📅 Calendar - Ngày khám
🕐 Clock - Giờ khám
🩺 Stethoscope - Bác sĩ
📄 FileText - Triệu chứng
💊 Pill - Đơn thuốc
💬 MessageSquare - Ghi chú
👁️ Eye - Xem chi tiết
✓ CheckCircle - Trạng thái
```

### **Typography:**

```css
/* Titles */
Page title: 3xl font-bold
Section title: lg font-bold

/* Body */
Main text: base text-gray-900
Labels: sm font-semibold
Subtitles: sm text-gray-600

/* Table */
Headers: sm font-bold
Cells: base text-gray-700
```

---

## 📊 Mock Data

Hệ thống hiện có **3 mẫu hồ sơ** để demo:

### **Record 1: Thiếu máu não**
- Bác sĩ: BS. Nguyễn Văn An
- Ngày: 25/03/2026
- Đơn thuốc: 3 loại (Vitamin B12, Sắt, Paracetamol)

### **Record 2: Viêm họng**
- Bác sĩ: BS. Trần Thị Bình
- Ngày: 20/03/2026
- Đơn thuốc: 2 loại (Strepsils, Paracetamol)

### **Record 3: Viêm đại tràng**
- Bác sĩ: BS. Lê Hoàng Cường
- Ngày: 15/03/2026
- Đơn thuốc: 3 loại (Normix, Smecta, Buscopan)

---

## 🎯 UX Features

### **List View:**
- ✅ Timeline chronological (newest first)
- ✅ Preview text truncation
- ✅ Hover effects
- ✅ Quick scan layout
- ✅ Clear date/time display

### **Detail Modal:**
- ✅ Smooth open/close animations
- ✅ ESC key support
- ✅ Click outside to close
- ✅ Scrollable content
- ✅ Sticky header/footer
- ✅ Print-friendly format

### **Empty State:**
- ✅ Friendly illustration
- ✅ Clear message
- ✅ CTA: "Đặt lịch khám ngay"
- ✅ Helpful guidance

---

## 🔍 Advanced Features (Future)

### **Search & Filter:**
```
🔍 Tìm kiếm theo:
├─ Tên bác sĩ
├─ Chẩn đoán
├─ Tên thuốc
└─ Ngày khám
```

### **Export:**
```
📥 Xuất dữ liệu:
├─ PDF (print-friendly)
├─ Email
└─ Share link (secure)
```

### **Analytics:**
```
📊 Thống kê:
├─ Tổng số lần khám
├─ Chẩn đoán thường gặp
├─ Thuốc đã dùng
└─ Timeline chart
```

---

## 🏗️ Technical Implementation

### **Files Created:**

```
/src/app/
├── context/
│   └── MedicalRecordContext.tsx    # State management + mock data
├── components/
│   └── medical-record-detail-modal.tsx  # Detail popup
└── pages/
    └── xem-ket-qua-kham-page.tsx   # Main list page
```

### **Context Provider:**

```typescript
<MedicalRecordProvider>
  ├─ medicalRecords: MedicalRecord[]
  ├─ addMedicalRecord()
  └─ getMedicalRecordsByPatient()
</MedicalRecordProvider>
```

### **State Management:**
- Local state: `selectedRecord`, `isModalOpen`
- Context API: global medical records
- Mock data: 3 sample records

### **Animations:**
- Motion (framer-motion fork)
- Smooth transitions
- Fade in/out effects
- Scale animations

---

## 📱 Responsive Design

### **Mobile (< 768px):**
- Stacked layout
- Full-width cards
- Touch-friendly buttons
- Collapsible sections
- Optimized table (horizontal scroll)

### **Tablet (768px - 1024px):**
- 2-column layout (info + action)
- Larger cards
- Better spacing

### **Desktop (> 1024px):**
- Max-width container
- Side-by-side layout
- Hover effects
- Enhanced shadows

---

## 🚀 Usage Guide

### **Xem danh sách:**
1. Đăng nhập với tài khoản bệnh nhân
2. Click menu "Hồ sơ bệnh án"
3. Xem danh sách các lần khám

### **Xem chi tiết:**
1. Click button "Xem chi tiết" trên card
2. Modal sẽ hiển thị
3. Scroll để xem toàn bộ thông tin
4. Click "Đóng" hoặc ESC để thoát

### **Navigation:**
```
Homepage
  └─ Sidebar → "Hồ sơ bệnh án"
       ↓
  List View (/xem-ket-qua-kham)
       ↓
  Click "Xem chi tiết"
       ↓
  Detail Modal
```

---

## ⚠️ Important Notes

### **Privacy & Security:**
- ✅ Chỉ hiển thị hồ sơ của chính mình
- ✅ Không hiển thị tên bệnh nhân trong header
- ✅ Link secure (không share public)
- ⚠️ Data sensitive - cần HTTPS trong production

### **Medical Accuracy:**
- ⚠️ Thông tin chỉ mang tính tham khảo
- ⚠️ Không thay thế tư vấn y tế trực tiếp
- ⚠️ Liên hệ bác sĩ nếu có thắc mắc

### **Data Persistence:**
- Current: In-memory storage (mock data)
- Production: Cần database backend
- Backup: Định kỳ export data

---

## 🎯 Success Metrics

### **User Engagement:**
- Số lượt xem hồ sơ
- Thời gian xem chi tiết
- Tỷ lệ quay lại xem

### **User Satisfaction:**
- Đánh giá tính rõ ràng (1-5 sao)
- Feedback về UI/UX
- Tỷ lệ in/export

---

## 🔮 Roadmap

### **Phase 1: ✅ DONE**
- [x] List view
- [x] Detail modal
- [x] Mock data
- [x] Responsive design

### **Phase 2: 🔜 NEXT**
- [ ] Search & filter
- [ ] Print/PDF export
- [ ] Backend integration
- [ ] Real doctor input

### **Phase 3: 📅 FUTURE**
- [ ] Analytics dashboard
- [ ] Share records (secure)
- [ ] Multi-language
- [ ] Voice notes from doctor

---

## 📞 Support

### **Cho bệnh nhân:**
- ❓ Không thấy hồ sơ? → Kiểm tra đã hoàn thành khám chưa
- ❓ Thông tin sai? → Liên hệ bác sĩ để cập nhật
- ❓ Không mở được? → Thử trình duyệt khác hoặc F5

### **Cho bác sĩ:**
- 📝 Cách nhập hồ sơ → Xem Doctor Dashboard Guide
- 🔄 Sửa hồ sơ → Trong vòng 24h sau khám
- 📋 Template → Có sẵn form mẫu

---

## ✅ Checklist triển khai Production

### **Backend:**
- [ ] Database schema cho medical_records
- [ ] API endpoints (GET, POST, UPDATE)
- [ ] Authentication & authorization
- [ ] Backup & recovery system

### **Security:**
- [ ] HTTPS enforced
- [ ] Data encryption
- [ ] HIPAA compliance (nếu ở US)
- [ ] Audit logging

### **Testing:**
- [ ] Unit tests (components)
- [ ] Integration tests (API)
- [ ] E2E tests (user flow)
- [ ] Accessibility audit

---

**Version:** 1.0.0  
**Last Updated:** March 2026  
**Status:** ✅ Frontend Complete (Mock Data)  
**Platform:** Ecommer Health

---

🎉 **Hồ sơ bệnh án giúp bệnh nhân theo dõi sức khỏe một cách chuyên nghiệp và minh bạch!**
