import { useState, useRef, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  ProgressBar,
  InputGroup,
} from "react-bootstrap";

const STEPS = {
  EMAIL: "email",
  OTP: "otp",
  NEW_PASSWORD: "new_password",
  SUCCESS: "success",
};

export default function ForgotPassword() {
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep(STEPS.OTP);
    setCountdown(60);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      otpRefs.current[index - 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = ["", "", "", "", "", ""];
    paste.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    otpRefs.current[Math.min(paste.length, 5)]?.focus();
  };

  const handleVerifyOTP = async () => {
    if (otp.join("").length < 6) {
      setError("Vui lòng nhập đủ 6 chữ số OTP.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep(STEPS.NEW_PASSWORD);
  };

  const handleResendOTP = async () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setCountdown(60);
    otpRefs.current[0]?.focus();
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { label: "Yếu", variant: "danger", now: 25 };
    if (score === 2)
      return { label: "Trung bình", variant: "warning", now: 50 };
    if (score === 3) return { label: "Khá mạnh", variant: "info", now: 75 };
    return { label: "Mạnh", variant: "success", now: 100 };
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep(STEPS.SUCCESS);
  };

  const strength = getPasswordStrength(newPassword);
  const stepList = [STEPS.EMAIL, STEPS.OTP, STEPS.NEW_PASSWORD];
  const currentStepIndex = stepList.indexOf(step);
  const stepLabels = ["Email", "Xác thực OTP", "Mật khẩu mới"];

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{
        background: "linear-gradient(135deg, #d1fae5, #ecfdf5, #d1fae5)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>
        {/* Header */}
        <Card
          className="border-0 shadow-sm mb-0"
          style={{
            borderRadius: "16px 16px 0 0",
            background: "linear-gradient(135deg, #065f46, #10b981)",
          }}
        >
          <Card.Body className="d-flex align-items-center gap-3 py-4 px-4">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
              style={{
                width: 44,
                height: 44,
                background: "rgba(255,255,255,0.2)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M11 2v18M2 11h18"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-white fw-bold mb-0" style={{ fontSize: 17 }}>
                MediCare Clinic
              </p>
              <p
                className="mb-0"
                style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}
              >
                Khôi phục tài khoản
              </p>
            </div>
          </Card.Body>
        </Card>

        {/* Main Card */}
        <Card
          className="border-0 shadow"
          style={{ borderRadius: "0 0 16px 16px" }}
        >
          <Card.Body className="p-4">
            {/* Step Indicator */}
            {step !== STEPS.SUCCESS && (
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  {stepLabels.map((label, i) => (
                    <small
                      key={i}
                      className="fw-semibold"
                      style={{
                        fontSize: 11,
                        color: i <= currentStepIndex ? "#065f46" : "#adb5bd",
                        flex: 1,
                        textAlign:
                          i === 0 ? "left" : i === 2 ? "right" : "center",
                      }}
                    >
                      {label}
                    </small>
                  ))}
                </div>
                <ProgressBar
                  now={(currentStepIndex / 2) * 100}
                  variant="success"
                  style={{ height: 6, borderRadius: 99 }}
                />
              </div>
            )}

            {/* ── STEP 1: Email ── */}
            {step === STEPS.EMAIL && (
              <>
                <h4 className="fw-bold text-dark mb-1">Quên mật khẩu?</h4>
                <p className="text-muted mb-4" style={{ fontSize: 14 }}>
                  Nhập email đăng ký tài khoản. Chúng tôi sẽ gửi mã OTP về địa
                  chỉ email đó.
                </p>

                {error && (
                  <Alert
                    variant="danger"
                    className="py-2 px-3"
                    style={{ fontSize: 13 }}
                  >
                    {error}
                  </Alert>
                )}

                <Form.Group className="mb-4">
                  <Form.Label
                    className="fw-semibold text-dark"
                    style={{ fontSize: 13 }}
                  >
                    Địa chỉ email
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white border-end-0">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M1 4l7 5 7-5M1 4h14v9a1 1 0 01-1 1H2a1 1 0 01-1-1V4z"
                          stroke="#6c757d"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                      className="border-start-0"
                      style={{ boxShadow: "none" }}
                    />
                  </InputGroup>
                </Form.Group>

                <Button
                  className="w-100 fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #065f46, #10b981)",
                    border: "none",
                    height: 44,
                  }}
                  onClick={handleSendOTP}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Đang gửi...
                    </>
                  ) : (
                    "Gửi mã OTP"
                  )}
                </Button>

                <div className="text-center mt-3">
                  <a
                    href="/login"
                    className="text-decoration-none d-inline-flex align-items-center gap-1"
                    style={{ color: "#065f46", fontSize: 13 }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M9 2L4 7l5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Quay lại đăng nhập
                  </a>
                </div>
              </>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === STEPS.OTP && (
              <>
                <h4 className="fw-bold text-dark mb-1">Nhập mã OTP</h4>
                <p className="text-muted mb-4" style={{ fontSize: 14 }}>
                  Mã xác thực 6 chữ số đã được gửi đến{" "}
                  <strong style={{ color: "#065f46" }}>{email}</strong>. Kiểm
                  tra hộp thư đến của bạn.
                </p>

                {error && (
                  <Alert
                    variant="danger"
                    className="py-2 px-3"
                    style={{ fontSize: 13 }}
                  >
                    {error}
                  </Alert>
                )}

                <div className="d-flex gap-2 mb-4" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <Form.Control
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="text-center fw-bold p-0"
                      style={{
                        height: 52,
                        fontSize: 22,
                        borderRadius: 10,
                        borderColor: digit ? "#10b981" : "#dee2e6",
                        background: digit ? "#ecfdf5" : "#fff",
                        color: digit ? "#065f46" : "#212529",
                        boxShadow: "none",
                      }}
                    />
                  ))}
                </div>

                <Button
                  className="w-100 fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #065f46, #10b981)",
                    border: "none",
                    height: 44,
                  }}
                  onClick={handleVerifyOTP}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Đang xác nhận...
                    </>
                  ) : (
                    "Xác nhận OTP"
                  )}
                </Button>

                <div className="text-center mt-3">
                  {countdown > 0 ? (
                    <small className="text-muted">
                      Gửi lại mã sau <strong>{countdown}s</strong>
                    </small>
                  ) : (
                    <Button
                      variant="link"
                      className="p-0 fw-semibold"
                      style={{ color: "#065f46", fontSize: 13 }}
                      onClick={handleResendOTP}
                      disabled={loading}
                    >
                      Gửi lại mã OTP
                    </Button>
                  )}
                </div>

                <div className="text-center mt-2">
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none d-inline-flex align-items-center gap-1"
                    style={{ color: "#6c757d", fontSize: 13 }}
                    onClick={() => {
                      setStep(STEPS.EMAIL);
                      setError("");
                      setOtp(["", "", "", "", "", ""]);
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M9 2L4 7l5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Đổi email khác
                  </Button>
                </div>
              </>
            )}

            {/* ── STEP 3: New Password ── */}
            {step === STEPS.NEW_PASSWORD && (
              <>
                <h4 className="fw-bold text-dark mb-1">Tạo mật khẩu mới</h4>
                <p className="text-muted mb-4" style={{ fontSize: 14 }}>
                  Mật khẩu mới phải khác mật khẩu cũ và có ít nhất 8 ký tự.
                </p>

                {error && (
                  <Alert
                    variant="danger"
                    className="py-2 px-3"
                    style={{ fontSize: 13 }}
                  >
                    {error}
                  </Alert>
                )}

                <Form.Group className="mb-3">
                  <Form.Label
                    className="fw-semibold text-dark"
                    style={{ fontSize: 13 }}
                  >
                    Mật khẩu mới
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white border-end-0">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="7"
                          width="10"
                          height="8"
                          rx="1.5"
                          stroke="#6c757d"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M5 7V5a3 3 0 016 0v2"
                          stroke="#6c757d"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setError("");
                      }}
                      className="border-start-0 border-end-0"
                      style={{ boxShadow: "none" }}
                    />
                    <Button
                      variant="outline-secondary"
                      className="border-start-0"
                      style={{ boxShadow: "none" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </InputGroup>
                  {strength && (
                    <div className="mt-2">
                      <ProgressBar
                        now={strength.now}
                        variant={strength.variant}
                        style={{ height: 5, borderRadius: 99 }}
                      />
                      <small className={`text-${strength.variant} fw-semibold`}>
                        {strength.label}
                      </small>
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label
                    className="fw-semibold text-dark"
                    style={{ fontSize: 13 }}
                  >
                    Xác nhận mật khẩu
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text className="bg-white border-end-0">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="7"
                          width="10"
                          height="8"
                          rx="1.5"
                          stroke="#6c757d"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M5 7V5a3 3 0 016 0v2"
                          stroke="#6c757d"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </InputGroup.Text>
                    <Form.Control
                      type={showConfirm ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleResetPassword()
                      }
                      className="border-start-0 border-end-0"
                      style={{ boxShadow: "none" }}
                      isValid={
                        !!confirmPassword && confirmPassword === newPassword
                      }
                      isInvalid={
                        !!confirmPassword && confirmPassword !== newPassword
                      }
                    />
                    <Button
                      variant="outline-secondary"
                      className="border-start-0"
                      style={{ boxShadow: "none" }}
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <EyeOff /> : <Eye />}
                    </Button>
                    <Form.Control.Feedback type="valid">
                      Mật khẩu khớp!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Mật khẩu không khớp.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button
                  className="w-100 fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #065f46, #10b981)",
                    border: "none",
                    height: 44,
                  }}
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Đang cập nhật...
                    </>
                  ) : (
                    "Đặt lại mật khẩu"
                  )}
                </Button>
              </>
            )}

            {/* ── SUCCESS ── */}
            {step === STEPS.SUCCESS && (
              <div className="text-center py-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                  style={{ width: 72, height: 72, background: "#d1fae5" }}
                >
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M6 18l8 8L30 10"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h4 className="fw-bold text-dark mb-2">Thành công!</h4>
                <p className="text-muted mb-4" style={{ fontSize: 14 }}>
                  Mật khẩu của bạn đã được đặt lại thành công. Bạn có thể đăng
                  nhập bằng mật khẩu mới ngay bây giờ.
                </p>
                <Button
                  href="/login"
                  className="fw-semibold px-5"
                  style={{
                    background: "linear-gradient(135deg, #065f46, #10b981)",
                    border: "none",
                    height: 44,
                  }}
                >
                  Đăng nhập ngay
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

function Eye() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
        stroke="#6c757d"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="8" r="2" stroke="#6c757d" strokeWidth="1.3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 2l12 12M6.5 6.6A2 2 0 0010 10M4 4.5C2.3 5.8 1 8 1 8s2.5 5 7 5c1.4 0 2.7-.4 3.8-1M7 3.1C7.3 3 7.7 3 8 3c4.5 0 7 5 7 5s-.6 1.2-1.6 2.3"
        stroke="#6c757d"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
