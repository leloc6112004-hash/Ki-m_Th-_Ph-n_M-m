# 📊 Data Consistency Guide - Ecommer Health

## 🎯 Mục tiêu

Đảm bảo **tính nhất quán dữ liệu** (Data Consistency) xuyên suốt toàn bộ hệ thống, từ khi bệnh nhân đặt lịch đến khi xem hồ sơ bệnh án.

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER JOURNEY & DATA FLOW                    │
└─────────────────────────────────────────────────────────────────┘

1. ĐẶT LỊCH HẸN (/dat-lich-hen)
   ↓
   Input Data:
   ├─ fullName          ✅ IMMUTABLE
   ├─ dateOfBirth       ✅ IMMUTABLE
   ├─ gender            ✅ IMMUTABLE
   ├─ phoneNumber       ✅ IMMUTABLE
   ├─ doctor            (editable by admin/doctor)
   ├─ date              (editable before confirmed)
   ├─ time              (editable before confirmed)
   ├─ symptoms          (patient input)
   └─ notes             (patient input)
   ↓
   Store in: AppointmentContext.currentBooking
   ↓

2. THANH TOÁN (/thanh-toan)
   ↓
   Display ALL data from currentBooking
   ├─ Họ tên            ← currentBooking.fullName
   ├─ Ngày sinh         ← currentBooking.dateOfBirth
   ├─ Giới tính         ← currentBooking.gender
   ├─ Số điện thoại     ← currentBooking.phoneNumber
   ├─ Bác sĩ            ← currentBooking.doctor
   ├─ Ngày khám         ← currentBooking.date
   ├─ Giờ khám          ← currentBooking.time
   ├─ Triệu chứng       ← currentBooking.symptoms
   └─ Ghi chú           ← currentBooking.notes
   ↓
   Data: PRESERVED (không thay đổi)
   ↓

3. THÔNG TIN THANH TOÁN (/thong-tin-thanh-toan)
   ↓
   Generate orderCode
   Amount: 100,000 VNĐ
   ↓
   On Success:
   Create Appointment Object
   ├─ id: auto-generated
   ├─ ...all data from currentBooking
   ├─ status: "Chờ duyệt"
   ├─ orderCode: generated
   ├─ amount: 100000
   └─ createdAt: timestamp
   ↓
   Store in: AppointmentContext.appointments[]
   Clear: currentBooking = null
   ↓

4. QUẢN LÝ LỊCH HẸN (/quan-ly-lich-hen)
   ↓
   Read from: AppointmentContext.appointments[]
   Display:
   ├─ Họ tên            ← appointment.fullName
   ├─ Ngày sinh         ← appointment.dateOfBirth
   ├─ Giới tính         ← appointment.gender
   ├─ Số điện thoại     ← appointment.phoneNumber
   ├─ Bác sĩ            ← appointment.doctor
   ├─ Ngày giờ khám     ← appointment.date + time
   ├─ Triệu chứng       ← appointment.symptoms
   ├─ Ghi chú           ← appointment.notes
   └─ Trạng thái        ← appointment.status
   ↓
   Doctor reviews → status changes
   ↓

5. HỒ SƠ BỆNH ÁN (/xem-ket-qua-kham)
   ↓
   When: appointment.status = "Completed"
   ↓
   Create Medical Record:
   ├─ PATIENT INFO (from appointment - IMMUTABLE)
   │  ├─ patientName     ← appointment.fullName
   │  ├─ dateOfBirth     ← appointment.dateOfBirth
   │  ├─ gender          ← appointment.gender
   │  └─ phoneNumber     ← appointment.phoneNumber
   │
   ├─ BOOKING INFO (from patient)
   │  └─ initialSymptoms ← appointment.symptoms
   │
   └─ MEDICAL INFO (from doctor - EDITABLE)
      ├─ mainDiagnosis
      ├─ subDiagnosis
      ├─ doctorConclusion
      ├─ prescription[]
      └─ doctorNotes
   ↓
   Store in: MedicalRecordContext.medicalRecords[]
```

---

## 📦 Data Structures

### **1. AppointmentData (Booking Input)**

```typescript
interface AppointmentData {
  // PATIENT INFO - IMMUTABLE
  fullName: string;          // "Nguyễn Văn A"
  dateOfBirth: string;       // "1990-01-15" (YYYY-MM-DD)
  gender: "Nam" | "Nữ";      // Radio selection
  phoneNumber: string;       // "0912345678"
  
  // APPOINTMENT INFO
  doctor: string;            // "BS. Nguyễn Văn An"
  date: string;              // "2026-04-01"
  time: string;              // "09:00"
  
  // OPTIONAL INFO
  symptoms: string;          // Patient description
  notes: string;             // Additional notes
}
```

### **2. Appointment (Full Record)**

```typescript
interface Appointment extends AppointmentData {
  // AUTO-GENERATED
  id: string;                // Unique ID
  orderCode: string;         // "DH12345678"
  amount: number;            // 100000
  createdAt: string;         // ISO timestamp
  
  // STATUS
  status: "Chờ duyệt" | "Đã chấp nhận" | "Bị từ chối" | "Đã hoàn tiền";
}
```

### **3. MedicalRecord (After Completed)**

```typescript
interface MedicalRecord {
  // SYSTEM INFO
  id: string;
  appointmentId: string;     // Link to appointment
  createdAt: string;
  
  // PATIENT INFO (IMMUTABLE - from appointment)
  patientName: string;       // ← appointment.fullName
  dateOfBirth: string;       // ← appointment.dateOfBirth
  gender: "Nam" | "Nữ";      // ← appointment.gender
  phoneNumber: string;       // ← appointment.phoneNumber
  
  // APPOINTMENT INFO
  date: string;              // Examination date
  time: string;              // Examination time
  doctor: string;            // Doctor name
  
  // FROM PATIENT (booking)
  initialSymptoms: string;   // ← appointment.symptoms
  
  // FROM DOCTOR (examination)
  mainDiagnosis: string;
  subDiagnosis: string;
  doctorConclusion: string;
  prescription: Medication[];
  doctorNotes: string;
  
  // STATUS
  status: "Đã hoàn thành";
}
```

---

## 🔒 Data Immutability Rules

### **IMMUTABLE DATA (READ-ONLY):**

#### **Patient Information:**
```typescript
✅ CANNOT CHANGE:
- fullName
- dateOfBirth
- gender
- phoneNumber

🔒 Source: Patient booking form
📍 Locations: Everywhere in the system
⚠️  Rule: Once entered, cannot be modified
```

**WHY?**
- Medical accuracy
- Legal compliance
- Data integrity
- Audit trail

**EXCEPTION:**
- Patient can update via "Edit Profile" (separate feature)
- Requires verification (OTP, password)
- Logs all changes

---

### **EDITABLE DATA (by Doctor/Admin):**

#### **Appointment Details:**
```typescript
⚠️ CAN CHANGE (before confirmed):
- doctor
- date
- time

📝 Who can edit: Admin, Doctor
⏰ When: Before status = "Đã chấp nhận"
```

#### **Medical Information:**
```typescript
✏️ CAN EDIT (by Doctor only):
- mainDiagnosis
- subDiagnosis
- doctorConclusion
- prescription[]
- doctorNotes

📝 Who can edit: Doctor only
⏰ When: During/after examination
```

---

## 🎯 Validation Rules

### **1. Ngày sinh (Date of Birth)**

```typescript
Validation:
- Format: YYYY-MM-DD
- Range: 1900-01-01 to today
- Logic: age >= 0 && age <= 150

Error messages:
- Empty: "Vui lòng nhập ngày sinh"
- Invalid: "Ngày sinh không hợp lệ"
- Future: "Ngày sinh không thể trong tương lai"
```

### **2. Giới tính (Gender)**

```typescript
Validation:
- Type: Radio button (strict)
- Options: "Nam" | "Nữ"
- Required: true

Error messages:
- Empty: "Vui lòng chọn giới tính"
```

### **3. Họ và tên (Full Name)**

```typescript
Validation:
- Min length: 2
- Max length: 100
- Pattern: Allow Vietnamese characters
- Trim: Remove leading/trailing spaces

Error messages:
- Empty: "Vui lòng nhập họ và tên"
- Too short: "Họ và tên quá ngắn"
```

### **4. Số điện thoại (Phone Number)**

```typescript
Validation:
- Format: 10 digits
- Prefix: 03, 05, 07, 08, 09
- Pattern: /^(03|05|07|08|09)\d{8}$/

Error messages:
- Empty: "Vui lòng nhập số điện thoại"
- Invalid: "Số điện thoại không hợp lệ"
```

---

## 🔄 State Management

### **AppointmentContext**

```typescript
State:
├─ currentBooking: AppointmentData | null
│  └─ Temporary storage for booking flow
│
└─ appointments: Appointment[]
   └─ Persistent list of all appointments

Methods:
├─ setCurrentBooking(data)
│  └─ Store booking data temporarily
│
├─ addAppointment(appointment)
│  └─ Add to appointments[] after payment
│
└─ updateAppointmentStatus(id, status)
   └─ Change appointment status
```

### **MedicalRecordContext**

```typescript
State:
└─ medicalRecords: MedicalRecord[]
   └─ List of all medical records

Methods:
├─ addMedicalRecord(record)
│  └─ Create new record after examination
│
└─ getMedicalRecordsByPatient()
   └─ Get records for current patient
```

---

## 📋 Data Display Format

### **Ngày sinh (Date of Birth)**

```typescript
// Storage format (database)
"1990-01-15"  // YYYY-MM-DD

// Display format (UI)
"15/01/1990"  // DD/MM/YYYY (Vietnamese)

// Code:
new Date(dateOfBirth).toLocaleDateString("vi-VN")
```

### **Ngày khám (Examination Date)**

```typescript
// Storage format
"2026-04-01"  // YYYY-MM-DD

// Display format (full)
"Thứ Ba, 1 tháng 4, 2026"

// Display format (short)
"01/04/2026"

// Code:
// Full:
new Date(date).toLocaleDateString("vi-VN", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})

// Short:
new Date(date).toLocaleDateString("vi-VN")
```

---

## 🎨 UI Consistency

### **Patient Info Display Pattern**

```tsx
// Standard display across all pages

<div className="flex items-start gap-3">
  <User className="w-5 h-5 text-blue-600" />
  <div>
    <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
    <p className="font-semibold text-gray-900">{fullName}</p>
  </div>
</div>

<div className="flex items-start gap-3">
  <Calendar className="w-5 h-5 text-blue-600" />
  <div>
    <p className="text-sm text-gray-600 mb-1">Ngày sinh</p>
    <p className="font-semibold text-gray-900">
      {new Date(dateOfBirth).toLocaleDateString("vi-VN")}
    </p>
  </div>
</div>

<div className="flex items-start gap-3">
  <User className="w-5 h-5 text-blue-600" />
  <div>
    <p className="text-sm text-gray-600 mb-1">Giới tính</p>
    <p className="font-semibold text-gray-900">{gender}</p>
  </div>
</div>
```

### **Color Coding**

```css
/* Patient Info - Green (Immutable) */
bg-green-50, border-green-300, text-green-600

/* Appointment Info - Blue */
bg-blue-50, border-blue-200, text-blue-600

/* Medical Results - Purple */
bg-purple-50, border-purple-200, text-purple-600

/* Status Badges */
"Chờ duyệt": bg-yellow-100, text-yellow-800
"Đã chấp nhận": bg-green-100, text-green-800
"Đã hoàn thành": bg-green-100, text-green-800
```

---

## ✅ Testing Checklist

### **Data Consistency Tests:**

#### **1. Booking Flow:**
- [ ] All fields save correctly to currentBooking
- [ ] Gender radio button selection works
- [ ] Date of birth validation works
- [ ] Phone number validation works
- [ ] Data persists when navigating back

#### **2. Payment Page:**
- [ ] All booking data displays correctly
- [ ] Date format shows DD/MM/YYYY
- [ ] Gender displays "Nam" or "Nữ"
- [ ] Optional fields (symptoms, notes) display if filled

#### **3. Payment Success:**
- [ ] Appointment created with all fields
- [ ] currentBooking cleared after success
- [ ] Order code generated
- [ ] Status set to "Chờ duyệt"

#### **4. Appointment Management:**
- [ ] All patient info displays correctly
- [ ] Date of birth formatted properly
- [ ] Gender shows correctly
- [ ] Status badge displays with correct color

#### **5. Medical Records:**
- [ ] Patient info section highlighted (green)
- [ ] "Chỉ đọc" badge shows
- [ ] All patient data matches appointment
- [ ] Medical info from doctor displays
- [ ] Prescription table formatted correctly

---

## 🚨 Common Issues & Solutions

### **Issue 1: Date format mismatch**

```typescript
❌ Problem:
dateOfBirth: "15/01/1990" // Wrong format

✅ Solution:
dateOfBirth: "1990-01-15" // Use YYYY-MM-DD
```

### **Issue 2: Gender not set**

```typescript
❌ Problem:
gender: "" // Empty string

✅ Solution:
// Validate before submit
if (!formData.gender) {
  errors.gender = "Vui lòng chọn giới tính";
}
```

### **Issue 3: Data lost on refresh**

```typescript
❌ Problem:
State lost when page refreshes

✅ Solution:
// Option 1: localStorage
localStorage.setItem('currentBooking', JSON.stringify(data))

// Option 2: Backend API
POST /api/appointments/draft

// Option 3: Session storage
sessionStorage.setItem('booking', JSON.stringify(data))
```

### **Issue 4: Phone number format**

```typescript
❌ Problem:
phoneNumber: "091-234-5678" // With dashes

✅ Solution:
phoneNumber: "0912345678" // Remove dashes
// Validation regex: /^(03|05|07|08|09)\d{8}$/
```

---

## 🎯 Best Practices

### **1. Single Source of Truth**

```typescript
✅ GOOD:
const { currentBooking } = useAppointment();
const fullName = currentBooking.fullName;

❌ BAD:
const [fullName, setFullName] = useState("");
// Duplicating state
```

### **2. Immutable Updates**

```typescript
✅ GOOD:
setAppointments(prev => [...prev, newAppointment]);

❌ BAD:
appointments.push(newAppointment);
setAppointments(appointments);
```

### **3. Type Safety**

```typescript
✅ GOOD:
gender: "Nam" | "Nữ";  // Strict type

❌ BAD:
gender: string;  // Any string allowed
```

### **4. Validation Consistency**

```typescript
✅ GOOD:
// Centralized validation
const validatePhoneNumber = (phone: string) => {
  return /^(03|05|07|08|09)\d{8}$/.test(phone);
};

❌ BAD:
// Different validation in different places
if (phone.length === 10) { ... }  // Not enough
```

---

## 📊 Data Flow Checklist

```
✅ Booking Form
   ├─ All required fields validated
   ├─ Date of birth: YYYY-MM-DD format
   ├─ Gender: "Nam" or "Nữ"
   ├─ Phone: 10 digits, correct prefix
   └─ Data stored in currentBooking

✅ Payment Page
   ├─ Display all booking data
   ├─ Format dates properly
   ├─ Show optional fields if present
   └─ Preserve data when go back

✅ Payment Success
   ├─ Create appointment with all fields
   ├─ Generate order code
   ├─ Set status = "Chờ duyệt"
   ├─ Clear currentBooking
   └─ Add to appointments[]

✅ Appointment List
   ├─ Show all patient info
   ├─ Display status badge
   ├─ Format dates consistently
   └─ Show optional fields if present

✅ Medical Record
   ├─ Patient info from appointment (immutable)
   ├─ Highlight as read-only
   ├─ Show "Chỉ đọc" badge
   ├─ Medical info from doctor
   └─ All data formatted correctly
```

---

**Version:** 2.0.0  
**Last Updated:** March 2026  
**Status:** ✅ Data Consistency Implemented  

---

🎉 **Hệ thống đảm bảo tính nhất quán dữ liệu xuyên suốt toàn bộ user journey!**
