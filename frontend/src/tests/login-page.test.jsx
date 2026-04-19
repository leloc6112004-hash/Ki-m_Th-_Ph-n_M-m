import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "@/components/Login";
import { MyUserContext } from "@/config/MyContexts";
import Apis from "@/config/Apis";

// 1. Mock các dependency bên ngoài
jest.mock("@/config/Apis");
jest.mock("react-cookies", () => ({
  save: jest.fn(),
}));

// Tạo một mock dispatch cho context
const mockDispatch = jest.fn();

// 2. Helper để render component trong bối cảnh (context & router)
const renderWithProviders = (ui) => {
  return render(
    <MyUserContext.Provider value={[{}, mockDispatch]}>
      <BrowserRouter>{ui}</BrowserRouter>
    </MyUserContext.Provider>,
  );
};

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form correctly", () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/ĐĂNG NHẬP NGƯỜI DÙNG/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tên đăng nhập/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mật khẩu/i)).toBeInTheDocument();
  });

  test("submits login form and calls API", async () => {
    // Mock response từ API
    Apis.post.mockResolvedValue({
      status: 200,
      data: { token: "fake-token", user: { username: "testuser" } },
    });

    renderWithProviders(<Login />);

    // Điền form
    fireEvent.change(screen.getByLabelText(/Tên đăng nhập/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Mật khẩu/i), {
      target: { value: "password123" },
    });

    // Click đăng nhập
    fireEvent.click(screen.getByRole("button", { name: /Đăng nhập/i }));

    // Kiểm tra API đã được gọi
    await waitFor(() => {
      expect(Apis.post).toHaveBeenCalled();
    });

    // Kiểm tra dispatch (cập nhật state global) đã được gọi
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "login",
      payload: { username: "testuser" },
    });
  });
});
