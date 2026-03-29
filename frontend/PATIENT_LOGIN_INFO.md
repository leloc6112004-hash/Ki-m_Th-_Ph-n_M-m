# Patient Login Information

## Demo Account Credentials

### Patient User:
- **Email:** `Benhnhan@gmail.com`
- **Password:** `Benhnhan123@@`

### Regular User (for comparison):
- **Email:** `leloc6112004@gmail.com`
- **Password:** `123456A@a`

---

## Patient Interface Features

When logged in with the Patient account (`Benhnhan@gmail.com`), the homepage will display:

### 1. **Hamburger Menu (Top Left)**
- **Icon:** ☰ Menu icon
- **Position:** Fixed at top-left corner
- **Click Action:** Opens left sidebar with patient menu

### 2. **Avatar Menu (Top Right)**
- **Icon:** User avatar icon
- **Position:** Fixed at top-right corner
- **Click Action:** Opens dropdown menu
- **Dropdown Options:**
  - Đăng xuất (Logout)

### 3. **Left Sidebar Menu**
Contains 3 main patient features:

#### **1. Đặt lịch hẹn** (Book Appointment)
- **Icon:** Calendar
- **Color:** Blue
- **Description:** Schedule appointments with doctors

#### **2. Quản lý lịch hẹn** (Manage Appointments)
- **Icon:** List
- **Color:** Green
- **Description:** View and manage your scheduled appointments

#### **3. Hồ sơ bệnh án** (Medical Records)
- **Icon:** Document/FileText
- **Color:** Purple
- **Description:** Access your medical history and records

---

## UI Design Specifications

### **Sidebar:**
- **Width:** 280px (mobile) / 320px (desktop)
- **Background:** White
- **Header:** Gradient blue (from-blue-500 to-blue-600)
- **Animation:** Smooth slide-in from left
- **Backdrop:** Semi-transparent black overlay (30% opacity)
- **Close Actions:**
  - Click X button in header
  - Click outside sidebar (backdrop)

### **Menu Items:**
- **Layout:** Icon + Text
- **Styling:**
  - Rounded corners (rounded-xl)
  - Soft shadows
  - Hover effects (shadow increase, color change)
  - Color-coded backgrounds (blue-50, green-50, purple-50)
- **Spacing:** Clear vertical spacing between items

### **Avatar Dropdown:**
- **Size:** 36px x 36px (mobile) / 40px x 40px (desktop)
- **Background:** Blue-100
- **Icon Color:** Blue-600
- **Dropdown Width:** 192px (48 in Tailwind)
- **Animation:** Chevron rotates 180° when open

---

## Behavior Notes

### **Homepage Content:**
- **Original Layout:** Preserved exactly as is
- **No Changes:** All existing homepage sections remain unchanged
- **Overlay Elements:** Hamburger menu and avatar are overlays on top of content

### **Navigation:**
- Menu items are clickable but do NOT navigate yet (placeholder functionality)
- Visual interactions only (hover effects, click to close sidebar)

### **Responsive Design:**
- **Mobile (<640px):**
  - Sidebar width: 280px
  - Smaller button sizes
  - Adjusted top positioning to avoid header overlap

- **Desktop (≥640px):**
  - Sidebar width: 320px
  - Full-size buttons and icons
  - Optimal spacing

### **Z-Index Hierarchy:**
- Sidebar: z-[70]
- Backdrop: z-[60]
- Overlay Buttons: z-50
- Dropdown: z-50

---

## Key Differences: Patient vs Regular User

| Feature | Regular User | Patient User |
|---------|--------------|--------------|
| Header Buttons | 3 feature buttons + Logout | Hidden (overlay replaces) |
| Hamburger Menu | None | Left sidebar menu |
| Avatar Menu | None | Top-right dropdown |
| Homepage Layout | Standard | Standard + Overlay |
| Navigation | Quick access buttons | Sidebar menu |

---

## Testing Instructions

1. **Login:**
   - Navigate to `/login`
   - Enter: `Benhnhan@gmail.com` / `Benhnhan123@@`
   - Click "Đăng nhập"

2. **Verify UI:**
   - Homepage loads with normal content
   - Hamburger menu button appears at top-left
   - Avatar menu button appears at top-right

3. **Test Sidebar:**
   - Click hamburger menu
   - Sidebar slides in from left
   - Click each menu item (should close sidebar)
   - Click backdrop to close

4. **Test Avatar Menu:**
   - Click avatar button
   - Dropdown appears below
   - Click "Đăng xuất" to logout
   - Should return to homepage (logged out state)

5. **Test Responsive:**
   - Resize browser to mobile width
   - Verify button positions adjust correctly
   - Test sidebar on mobile width

---

## Technical Implementation

### **Components:**
- `PatientOverlay` - Main container for hamburger + avatar
- `PatientSidebar` - Left sliding menu
- `HomePage` - Conditionally renders PatientOverlay

### **Conditional Rendering:**
```typescript
const isPatient = isAuthenticated && username === "Benhnhan@gmail.com";
{isPatient && <PatientOverlay />}
```

### **Authentication:**
- Uses existing AuthContext
- Checks username to determine if patient
- Same logout flow as regular users

---

## Future Enhancements (Not Implemented)

- Navigation to actual feature pages
- Patient-specific data fetching
- Appointment booking functionality
- Medical records viewer
- Notification system

---

**Note:** This interface is designed to transform the homepage into a patient portal using overlay elements without modifying the original layout. All interactions are visual only - no backend integration required.
