import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import ForgotPasswordPage from "./pages/forgot-password-page";
import RegisterPage from "./pages/register-page";
import DatLichHenPage from "./pages/dat-lich-hen-page";
import XemKetQuaKhamPage from "./pages/xem-ket-qua-kham-page";
import ThanhToanPage from "./pages/thanh-toan-page";
import ThongTinThanhToanPage from "./pages/thong-tin-thanh-toan-page";
import QuanLyLichHenPage from "./pages/quan-ly-lich-hen-page";
import DoctorLoginPage from "./pages/doctor-login-page";
import DoctorDashboardPage from "./pages/doctor-dashboard-page";
import DoctorAppointmentsPage from "./pages/doctor-appointments-page";
import DoctorExaminationPage from "./pages/doctor-examination-page";
import DoctorMedicalRecordsPage from "./pages/doctor-medical-records-page";
import DoctorAuthTestPage from "./pages/doctor-auth-test-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/dat-lich-hen",
    Component: DatLichHenPage,
  },
  {
    path: "/thanh-toan",
    Component: ThanhToanPage,
  },
  {
    path: "/thong-tin-thanh-toan",
    Component: ThongTinThanhToanPage,
  },
  {
    path: "/quan-ly-lich-hen",
    Component: QuanLyLichHenPage,
  },
  {
    path: "/xem-ket-qua-kham",
    Component: XemKetQuaKhamPage,
  },
  // Doctor routes
  {
    path: "/bacsi/login",
    Component: DoctorLoginPage,
  },
  {
    path: "/bacsi/dashboard",
    Component: DoctorDashboardPage,
  },
  {
    path: "/bacsi/lich-kham",
    Component: DoctorAppointmentsPage,
  },
  {
    path: "/bacsi/kham-benh",
    Component: DoctorExaminationPage,
  },
  {
    path: "/bacsi/ho-so-benh-an",
    Component: DoctorMedicalRecordsPage,
  },
  {
    path: "/bacsi/auth-test",
    Component: DoctorAuthTestPage,
  },
]);