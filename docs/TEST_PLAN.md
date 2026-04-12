# TEST PLAN - Clinic Management System

## Table of Contents
- [1. Introduction](#1-introduction)
  - [1.1 Project Background](#11-project-background)
  - [1.2 Purpose of Test Plan](#12-purpose-of-test-plan)
  - [1.3 Test Object](#13-test-object)
  - [1.4 Intended Audience](#14-intended-audience)
- [2. Scope](#2-scope)
  - [2.1 In-Scope](#21-in-scope)
  - [2.2 Out-of-Scope](#22-out-of-scope)
- [3. Quality Objectives](#3-quality-objectives)
  - [3.1 Primary Objectives](#31-primary-objectives)
  - [3.2 Secondary Objectives](#32-secondary-objectives)
- [4. Test Approach](#4-test-approach)
- [5. Roles and Responsibilities](#5-roles-and-responsibilities)
- [6. Entry and Exit Criteria](#6-entry-and-exit-criteria)
- [7. Suspension and Resumption Criteria](#7-suspension-and-resumption-criteria)
- [8. Test Strategy](#8-test-strategy)
- [9. Resources and Environment](#9-resources-and-environment)
- [10. Test Schedule](#10-test-schedule)
- [Approvals](#approvals)
- [Terms / Acronyms](#terms--acronyms)

---

## 1. Introduction

### 1.1 Project Background
Hệ thống Quản lý Phòng khám được xây dựng nhằm hỗ trợ số hóa quy trình khám chữa bệnh tại phòng khám.  

Trong thực tế:
- Bệnh nhân phải chờ lâu  
- Khó theo dõi lịch khám  
- Hồ sơ dễ thất lạc  

Hệ thống cho phép:
- Đặt lịch khám online  
- Thanh toán đặt cọc  
- Bác sĩ khám và kê đơn  
- Lưu trữ hồ sơ bệnh án điện tử  
- Admin quản lý dữ liệu hệ thống  

---

### 1.2 Purpose of Test Plan
Mục tiêu của Test Plan:

- Đảm bảo hệ thống đúng yêu cầu  
- Phát hiện và ghi nhận lỗi  
- Đánh giá độ ổn định hệ thống  
- Là cơ sở xây dựng Test Case  

---

### 1.3 Test Object
Đối tượng kiểm thử bao gồm:

- UI (Giao diện người dùng)  
- Chức năng nghiệp vụ  
- Logic hệ thống  
- Luồng giữa các actor (Patient, Doctor, Admin)  

**Version:** 1.0  

---

### 1.4 Intended Audience

- Developers  
- Testers  
- Giảng viên  
- Stakeholders  

---

## 2. Scope

### 2.1 In-Scope

#### Patient
- Đặt lịch khám  
- Validate slot  
- Thanh toán đặt cọc  
- Xem lịch hẹn  
- Xem hồ sơ  

#### Doctor
- Xem lịch khám  
- Nhập chẩn đoán  
- Kê đơn thuốc  
- Xem hồ sơ  

#### Admin
- CRUD bác sĩ  
- Quản lý chuyên khoa  
- Quản lý thuốc  

#### End-to-End Flow
- Booking → Payment → Consultation → Prescription → Medical Record  

#### System Logic
- Business Rules  
- State Transition  
- Exception Handling  

---

### 2.2 Out-of-Scope

- Bảo hiểm y tế  
- Hệ thống nội trú  
- Performance & Security chuyên sâu  
- Tích hợp payment chi tiết  
- Cross-browser nâng cao  

---

## 3. Quality Objectives

### 3.1 Primary Objectives

- Đảm bảo đúng SRS  
- Validate luồng nghiệp vụ  
- Giảm bug trước release  
- Đảm bảo dữ liệu chính xác  
- Đảm bảo consistency dữ liệu  
- CRUD hoạt động đúng  
- Không có critical bug  

---

### 3.2 Secondary Objectives

- Cải thiện usability  
- UI rõ ràng  
- Performance chấp nhận được  
- Giảm rủi ro  
- Đảm bảo phân quyền  
- Ổn định môi trường  
- Tăng user satisfaction  

---

## 4. Test Approach

### 4.1 Test Automation
- Xác định phần auto/manual  
- Tool, framework  
- CI/CD execution  

### 4.2 Test Manual
- Test case execution  
- Exploratory testing  

---

## 5. Roles and Responsibilities

- QA: viết & chạy test  
- Dev: fix bug  
- PM: quyết định release  
- BA: confirm requirement  

---

## 6. Entry and Exit Criteria

### 6.1 Entry Criteria
- Build thành công  
- Requirement ổn định  
- Môi trường sẵn sàng  
- Có test data  

### 6.2 Exit Criteria
- ≥ 95% pass  
- Không có critical bug  
- Report approved  

---

## 7. Suspension and Resumption Criteria

### 7.1 Suspension Criteria
- System crash  
- Build lỗi  
- Data sai  
- Test case sai  

### 7.2 Resumption Criteria
- Fix bug xong  
- Build ổn định  
- Môi trường OK  

---

## 8. Test Strategy

### 8.1 QA Role
- Review requirement  
- Write test case  
- Execute test  
- Log bug  
- Retest  
- Report  

### 8.2 Bug Life Cycle
New → Assigned → Fixed → Retest → Closed / Reopen  

### 8.3 Testing Types
- Functional  
- Integration  
- System  
- Regression  
- Performance  
- Security  
- Usability  

### 8.4 Severity & Priority

**Severity:** mức độ nghiêm trọng  
**Priority:** mức độ ưu tiên  

---

## 9. Resources and Environment

### 9.1 Testing Tools
- (Điền tool)

### 9.2 Configuration Management
- Quản lý version & config  

### 9.3 Test Environment
- Web environment  

---

## 10. Test Schedule

- Timeline theo tuần  
- Milestones  
- Deadline  
- Buffer fix bug  

---

## Approvals
- (Người phê duyệt)

---

## Terms / Acronyms
- SRS: Software Requirements Specification  
- QA: Quality Assurance  
- UAT: User Acceptance Testing  
