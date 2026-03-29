# 🏥 Hệ thống Đặt lịch khám & Thanh toán - Ecommer Health

## 📋 Tổng quan

Hệ thống quản lý đặt lịch khám bệnh trực tuyến với tính năng thanh toán mock MoMo, được thiết kế cho nền tảng y tế Ecommer Health.

---

## 🔐 Thông tin đăng nhập

### Tài khoản Bệnh nhân (Patient):
```
Email: Benhnhan@gmail.com
Password: Benhnhan123@@
```

### Tài khoản thông thường:
```
Email: leloc6112004@gmail.com
Password: 123456A@a
```

---

## 🎯 Quy trình đặt lịch (User Flow)

### **Bước 1: Đăng nhập**
- Truy cập trang login: `/login`
- Nhập thông tin đăng nhập
- Sau khi đăng nhập thành công, sẽ được chuyển về trang chủ

### **Bước 2: Đặt lịch hẹn**
- Click vào menu "Đặt lịch hẹn" (có thể từ header hoặc sidebar)
- Điền thông tin trong form:

**Thông tin bắt buộc:**
- ✅ Họ và tên (text input)
- ✅ Số điện thoại (10 số, bắt đầu bằng 03/05/07/08/09)
- ✅ Chọn bác sĩ (dropdown)
- ✅ Ngày khám (date picker - không thể chọn quá khứ)
- ✅ Giờ khám (time picker)

**Thông tin tùy chọn:**
- Triệu chứng (textarea)
- Ghi chú (textarea)

- Click nút **"Tiếp tục"** để chuyển sang bước thanh toán

### **Bước 3: Xác nhận thanh toán**
- Xem lại toàn bộ thông tin đã điền
- Kiểm tra số tiền: **100.000 VNĐ**
- Phương thức thanh toán: **Ví MoMo** (đã chọn sẵn)
- Click **"Thanh toán"** để tiếp tục, hoặc **"Quay lại"** để chỉnh sửa

### **Bước 4: Thanh toán qua MoMo (Mock)**
- Hiển thị mã đơn hàng tự động
- Hiển thị QR code giả lập
- Click **"Thanh toán bằng Ví MoMo"**
- Xuất hiện 2 nút mô phỏng kết quả:
  - ✅ **"Thành công"** → Chuyển đến trang quản lý lịch hẹn
  - ❌ **"Thất bại"** → Quay lại trang thanh toán

### **Bước 5: Quản lý lịch hẹn**
- Xem danh sách các lịch hẹn đã đặt
- Mỗi lịch hẹn hiển thị:
  - Thông tin bệnh nhân
  - Thông tin bác sĩ
  - Ngày giờ khám
  - Trạng thái lịch hẹn
  - Số tiền đã thanh toán

---

## 🎨 Trạng thái lịch hẹn (Status)

### **1. Chờ duyệt** (Màu vàng)
- **Ý nghĩa:** Lịch hẹn mới được tạo, đang chờ bác sĩ xem xét
- **Thời gian:** Bác sĩ sẽ duyệt trong vòng 24 giờ
- **Hiển thị:** "Bác sĩ đang xem xét lịch hẹn của bạn. Vui lòng chờ trong 24 giờ."

### **2. Đã chấp nhận** (Màu xanh lá)
- **Ý nghĩa:** Bác sĩ đã chấp nhận lịch hẹn
- **Hành động:** Bệnh nhân cần đến khám đúng giờ
- **Hiển thị:** "Vui lòng đến khám đúng giờ"

### **3. Bị từ chối** (Màu đỏ)
- **Ý nghĩa:** Bác sĩ từ chối lịch hẹn (bận, không phù hợp, etc.)
- **Hành động:** Tiền sẽ được hoàn lại
- **Hiển thị:** "Lịch hẹn bị từ chối. Tiền sẽ được hoàn lại"

### **4. Đã hoàn tiền** (Màu xám)
- **Ý nghĩa:** Lịch hẹn bị hủy và tiền đã được hoàn trả
- **Nguyên nhân:** Bác sĩ không phản hồi sau 24 giờ hoặc lịch hẹn bị từ chối
- **Hiển thị:** "Lịch hẹn đã bị hủy và tiền đã được hoàn trả"

---

## 🔄 Business Logic

### **Auto-refund sau 24 giờ:**
- Nếu bác sĩ không duyệt/từ chối trong 24 giờ
- Hệ thống tự động hoàn tiền
- Trạng thái chuyển sang "Đã hoàn tiền"

### **Validation Rules:**

**Họ và tên:**
- Không được để trống

**Số điện thoại:**
- Định dạng: 10 số
- Bắt đầu bằng: 03, 05, 07, 08, 09
- Ví dụ: 0912345678

**Bác sĩ:**
- Phải chọn 1 trong danh sách

**Ngày khám:**
- Không được chọn ngày trong quá khứ
- Chỉ chọn từ hôm nay trở đi

**Giờ khám:**
- Phải chọn 1 trong các khung giờ có sẵn
- Sáng: 08:00 - 10:30
- Chiều: 13:00 - 16:00

---

## 📱 Responsive Design

### **Mobile (< 768px):**
- Form full-width
- Các trường xếp dọc
- Button full-width
- Touch-friendly targets

### **Tablet (768px - 1024px):**
- Layout 2 cột cho ngày/giờ
- Card căn giữa
- Spacing tối ưu

### **Desktop (> 1024px):**
- Max-width content
- Hover effects
- Larger spacing
- Enhanced shadows

---

## 🎨 Design System

### **Màu sắc chính:**
```css
Primary Blue: #3B82F6
Green (Success): #22C55E
Yellow (Warning): #EAB308
Red (Error): #EF4444
Purple: #A855F7
Pink (MoMo): #A91C78
```

### **Typography:**
- Headers: 2xl - 3xl font-bold
- Body: base text-gray-900
- Labels: sm font-semibold
- Hints: xs text-gray-600

### **Components:**
- **Buttons:** rounded-lg, py-3-4, shadow-lg
- **Cards:** rounded-2xl, shadow-xl
- **Inputs:** rounded-lg, border, focus:ring-2
- **Badges:** rounded-full, px-4, py-2, border

---

## 🛠️ Technical Stack

### **Frontend:**
- React 18.3.1
- TypeScript
- React Router 7
- Tailwind CSS 4
- Motion (animations)
- Lucide React (icons)
- Sonner (toast notifications)

### **State Management:**
- Context API (AuthContext, AppointmentContext)
- LocalStorage (persistent auth)
- In-memory storage (appointments)

### **Form Handling:**
- Controlled components
- Real-time validation
- Error messages
- Phone number formatting

---

## 📂 File Structure

```
/src/app/
├── context/
│   ├── AuthContext.tsx         # Authentication state
│   └── AppointmentContext.tsx  # Appointment state
├── pages/
│   ├── dat-lich-hen-page.tsx       # Booking form
│   ├── thanh-toan-page.tsx         # Payment summary
│   ├── thong-tin-thanh-toan-page.tsx # MoMo mock
│   └── quan-ly-lich-hen-page.tsx   # Appointment list
├── components/
│   ├── header.tsx              # Main navigation
│   ├── patient-sidebar.tsx     # Patient menu
│   └── patient-overlay.tsx     # Hamburger + avatar
├── routes.ts                   # Route configuration
└── App.tsx                     # App wrapper
```

---

## 🚀 Navigation Flow

```
Homepage (/)
    ↓
Login (/login)
    ↓
Homepage (authenticated)
    ↓
Đặt lịch hẉn (/dat-lich-hen)
    ↓
Thanh toán (/thanh-toan)
    ↓
Thông tin thanh toán (/thong-tin-thanh-toan)
    ↓ (success)
Quản lý lịch hẹn (/quan-ly-lich-hen)
```

---

## 🎯 User Experience Features

### **Feedback tức thì:**
- ✅ Toast notifications (success/error)
- ✅ Form validation real-time
- ✅ Loading states (animations)
- ✅ Clear error messages

### **Navigation dễ dàng:**
- ✅ Breadcrumbs (Quay lại button)
- ✅ Auto-redirect after success
- ✅ Preserve data when go back
- ✅ Clear step indicators

### **Accessibility:**
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Color contrast (WCAG AA)

---

## ⚠️ Important Notes

### **Mock Payment:**
- Đây là môi trường mô phỏng (demo)
- KHÔNG kết nối với ví MoMo thật
- KHÔNG thu tiền thật
- Chỉ để demo flow thanh toán

### **Data Persistence:**
- Appointments được lưu trong memory
- Refresh trang = mất data
- Để production: cần backend + database

### **Privacy:**
- Header không hiển thị tên bệnh nhân
- Chỉ hiển thị "Xin chào!"
- Mobile menu có thể hiển thị username

---

## 📝 Testing Checklist

### **Form Validation:**
- [ ] Tất cả required fields đều validate
- [ ] Phone format đúng (10 số, prefix đúng)
- [ ] Không thể chọn ngày quá khứ
- [ ] Error messages hiển thị đúng
- [ ] Clear error khi user nhập lại

### **Navigation:**
- [ ] Quay lại button hoạt động
- [ ] Auto-redirect sau payment success
- [ ] Data được preserve khi quay lại
- [ ] Sidebar navigation hoạt động

### **Payment Flow:**
- [ ] Summary hiển thị đủ thông tin
- [ ] MoMo mock UI hiển thị đúng
- [ ] Success → redirect đến quản lý
- [ ] Failure → quay lại thanh toán

### **Appointment Display:**
- [ ] List hiển thị đúng thứ tự
- [ ] Status badge màu đúng
- [ ] Thông tin đầy đủ
- [ ] Empty state hiển thị khi chưa có lịch

---

## 🔮 Future Enhancements

### **Backend Integration:**
- [ ] Real API endpoints
- [ ] Database persistence
- [ ] Real authentication (JWT)
- [ ] Real payment gateway

### **Advanced Features:**
- [ ] Email/SMS notifications
- [ ] Reminder system
- [ ] Calendar sync
- [ ] Video consultation
- [ ] Medical records upload
- [ ] Prescription management
- [ ] Review & rating system

### **Admin Panel:**
- [ ] Doctor dashboard
- [ ] Approve/reject appointments
- [ ] Schedule management
- [ ] Patient history
- [ ] Revenue reports

---

## 💡 Tips for Users

1. **Đặt lịch sớm:** Đặt trước ít nhất 1 ngày để đảm bảo bác sĩ có thể duyệt
2. **Điền đầy đủ:** Điền triệu chứng giúp bác sĩ chuẩn bị tốt hơn
3. **Kiểm tra lại:** Xem kỹ thông tin trước khi thanh toán
4. **Theo dõi:** Vào "Quản lý lịch hẹn" để xem trạng thái
5. **Đúng giờ:** Đến khám đúng giờ đã đặt

---

## 📞 Support

Nếu gặp vấn đề khi sử dụng, vui lòng liên hệ:
- **Email:** support@ecommer.health
- **Phone:** 1900-xxxx
- **Hotline:** 24/7

---

**Version:** 1.0.0  
**Last Updated:** March 2026  
**Status:** ✅ Production Ready (Mock Payment)  
**Platform:** Ecommer Health

---

🎉 **Chúc bạn có trải nghiệm tốt với hệ thống đặt lịch khám của Ecommer Health!**
