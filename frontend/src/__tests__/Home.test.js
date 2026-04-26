import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/Home.js";

describe("Home component", () => {
  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
  };

  test("renders hero section content", () => {
    renderHome();

    expect(screen.getByText("Chào mừng đến với QH Clinic")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Sức khỏe của bạn là sứ mệnh của chúng tôi",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Hệ thống quản lý phòng khám hiện đại/i),
    ).toBeInTheDocument();
  });

  test("renders main action links correctly", () => {
    renderHome();

    const bookingLink = screen.getByRole("link", {
      name: /Đặt lịch ngay/i,
    });

    const registerLink = screen.getByRole("link", {
      name: /Tìm hiểu thêm/i,
    });

    expect(bookingLink).toHaveAttribute("href", "/booking");
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  test("renders quick info cards", () => {
    renderHome();

    expect(screen.getByText("24/7 Phục vụ")).toBeInTheDocument();
    expect(screen.getByText("50+ Bác sĩ")).toBeInTheDocument();
    expect(screen.getByText("An toàn")).toBeInTheDocument();
  });

  test("renders service section", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        name: "Dịch vụ tiêu biểu",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Đặt lịch trực tuyến")).toBeInTheDocument();
    expect(screen.getByText("Hồ sơ điện tử")).toBeInTheDocument();
    expect(screen.getByText("Bác sĩ chuyên khoa")).toBeInTheDocument();
    expect(screen.getByText("Thanh toán linh hoạt")).toBeInTheDocument();
  });
});
