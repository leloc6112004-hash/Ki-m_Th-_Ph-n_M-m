# 🏥 Quick Reference - Patient Interface

## 🔐 Login Credentials

### Patient Account
```
Email: Benhnhan@gmail.com
Password: Benhnhan123@@
```

### Regular User Account (for comparison)
```
Email: leloc6112004@gmail.com
Password: 123456A@a
```

---

## 🎯 What to Expect After Patient Login

### Visual Changes:
1. **Homepage** - All content stays exactly the same
2. **Top-Left Corner** - ☰ Hamburger menu button appears
3. **Top-Right Corner** - 👤 Avatar icon appears

### No Changes:
- Original homepage layout preserved
- All sections remain unchanged
- Regular header is still visible

---

## 🔧 Interactive Elements

### 1️⃣ Hamburger Menu (☰)
**Location:** Top-left corner  
**Click Action:** Opens left sidebar

**Sidebar Contains:**
- 📅 **Đặt lịch hẹn** (Book Appointment) - Blue
- 📋 **Quản lý lịch hẹn** (Manage Appointments) - Green
- 📄 **Hồ sơ bệnh án** (Medical Records) - Purple

**How to Close:**
- Click X button in header
- Click outside sidebar (backdrop)
- Press ESC key
- Click any menu item

### 2️⃣ Avatar Menu (👤)
**Location:** Top-right corner  
**Click Action:** Opens dropdown

**Dropdown Contains:**
- 🚪 **Đăng xuất** (Logout)

**How to Close:**
- Click outside
- Press ESC key
- Click logout

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- Sidebar: 280px width
- Buttons: Smaller sizes
- Adjusted top positioning

### Desktop (≥ 640px)
- Sidebar: 320px width
- Full-size buttons
- Optimal spacing

---

## 🎨 Design Features

### Sidebar
- **Style:** Modern, clean medical design
- **Header:** Blue gradient
- **Animation:** Smooth slide-in from left
- **Items:** Color-coded with icons
- **Footer:** Ecommer Health branding

### Buttons
- **Hamburger:** White background, gray icon
- **Avatar:** Blue circle with user icon
- **Shadows:** Soft, elegant
- **Hover:** Subtle background change

---

## ⌨️ Keyboard Shortcuts

- **ESC** - Close sidebar
- **ESC** - Close avatar dropdown

---

## 🔄 User Flow

1. **Login** → Enter patient credentials
2. **Homepage** → See hamburger + avatar buttons
3. **Open Menu** → Click hamburger for sidebar
4. **Select Feature** → Click menu item (closes sidebar)
5. **Logout** → Click avatar → Đăng xuất

---

## ✅ Testing Checklist

- [ ] Login with patient credentials works
- [ ] Hamburger button appears at top-left
- [ ] Avatar button appears at top-right
- [ ] Sidebar opens smoothly
- [ ] All 3 menu items visible
- [ ] Click outside closes sidebar
- [ ] ESC closes sidebar
- [ ] Avatar dropdown opens
- [ ] Logout works correctly
- [ ] Responsive on mobile
- [ ] No layout shifts

---

## 🚫 Known Limitations

- Menu items don't navigate (placeholder only)
- No actual appointment booking functionality
- No medical records integration
- Visual interactions only

---

## 🎯 Key Differences: Patient vs Regular User

| Feature | Regular User | Patient User |
|---------|--------------|--------------|
| Login Email | leloc6112004@gmail.com | Benhnhan@gmail.com |
| Header Buttons | Visible | Visible |
| Hamburger Menu | ❌ No | ✅ Yes |
| Avatar Menu | ❌ No | ✅ Yes |
| Sidebar | ❌ No | ✅ Yes |
| Homepage Layout | Standard | Standard |

---

## 💡 Tips

- **Hamburger menu** - For quick access to patient features
- **Avatar menu** - For account actions (logout)
- **ESC key** - Quick close for both menus
- **Click outside** - Alternative close method
- **Mobile** - Fully responsive, test on different sizes

---

**Created:** 2025  
**Platform:** Ecommer Health  
**Type:** Patient Portal Interface  
**Status:** ✅ Ready for Testing
