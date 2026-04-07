

import React, { useRef, useState } from "react";
import { Alert, Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../config/Apis";

import MySpinner from "./layout/MySpinner";
const Register = () => {
    const info = [
        { title: "Họ và tên", field: "fullName", type: "text" },
        { title: "Số điện thoại", field: "phoneNumber", type: "tel" },
        { title: "Email", field: "email", type: "email" },
        { title: "Giới tính", field: "gender", type: "select" },
        { title: "Tên đăng nhập", field: "username", type: "text" },
        { title: "Mật khẩu", field: "password", type: "password" },
        { title: "Xác nhận mật khẩu", field: "confirm", type: "password" },
    ];
    const avatar = useRef();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const nav = useNavigate();

    const change = (e) => {
        const { name, value } = e.target; // Dùng name thay cho field
        setUser({ ...user, [name]: value });
    };

    const register = async (e) => {
        e.preventDefault();
        setErr("");

        if (user.password !== user.confirm) {
            setErr("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            setLoading(true);

            let formData = new FormData();
            for (let key in user) {
                if (key !== "confirm") {
                    formData.append(key, user[key]);
                }
            }

            if (avatar.current.files[0]) {
                formData.append("avatar", avatar.current.files[0]);
            }
            
            // Log formData để kiểm tra
            for (const pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            let res = await Apis.post(endpoints["register"], formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 201) {
                nav("/login");
            } else {
                setErr("Hệ thống có lỗi, vui lòng thử lại sau!");
            }
        } catch (ex) {
            console.error(ex);
            setErr("Đăng ký thất bại. Tên đăng nhập đã tồn tại hoặc có lỗi khác.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={8} lg={6}>
                    <Card className="p-4 shadow">
                        <Card.Body>
                            <h2 className="text-center text-success mb-4">ĐĂNG KÝ NGƯỜI DÙNG</h2>
                            {err && <Alert variant="danger" className="mt-2">{err}</Alert>}
                            <Form onSubmit={register}>
                                {info.map((i) => (
                                    <Form.Group key={i.field} className="mb-3">
                                        <Form.Label>{i.title}</Form.Label>
                                        {i.type === "select" ? (
                                            <Form.Select
                                                name={i.field} // Tên field trong FormData
                                                value={user[i.field] || ""}
                                                onChange={change}
                                                required
                                            >
                                                <option value="">Chọn giới tính...</option>
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                               
                                            </Form.Select>
                                        ) : (
                                            <Form.Control
                                                name={i.field} // Tên field trong FormData
                                                value={user[i.field] || ""}
                                                onChange={change}
                                                type={i.type}
                                                placeholder={i.title}
                                                required
                                            />
                                        )}
                                    </Form.Group>
                                ))}
                                <Form.Group className="mb-3" controlId="avatar">
                                    <Form.Label>Ảnh đại diện</Form.Label>
                                    <Form.Control type="file" ref={avatar} />
                                </Form.Group>
                                <div className="text-center">
                                    {loading ? (
                                        <MySpinner />
                                    ) : (
                                        <Button variant="success" type="submit">
                                            Đăng ký
                                        </Button>
                                    )}
                                </div>
                            </Form>
                            <p className="text-center mt-3">
                                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;