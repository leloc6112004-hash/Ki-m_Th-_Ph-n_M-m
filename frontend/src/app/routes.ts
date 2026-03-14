import { createBrowserRouter } from "react-router";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import ForgotPasswordPage from "./pages/forgot-password-page";
import RegisterPage from "./pages/register-page";
import DatLichHenPage from "./pages/dat-lich-hen-page";
import XemDonThuocPage from "./pages/xem-don-thuoc-page";
import XemKetQuaKhamPage from "./pages/xem-ket-qua-kham-page";

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
    path: "/xem-don-thuoc",
    Component: XemDonThuocPage,
  },
  {
    path: "/xem-ket-qua-kham",
    Component: XemKetQuaKhamPage,
  },
]);