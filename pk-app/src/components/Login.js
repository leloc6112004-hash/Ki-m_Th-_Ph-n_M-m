import React, { useContext, useState } from "react";
import { Alert, Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import cookie from 'react-cookies';

import MySpinner from "./layout/MySpinner";
import { MyUserContext } from "../config/MyContexts";
import Apis, { endpoints } from "../config/Apis";

const Login = () => {
    const info = [
        { title: "Tên đăng nhập", field: "username", type: "text" },
        { title: "Mật khẩu", field: "password", type: "password" }
    ];

    const [user, setUser] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const nav = useNavigate();
    const [, dispatch] = useContext(MyUserContext);
    const [q] = useSearchParams();

    const change = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErr(""); // Reset lỗi khi người dùng bắt đầu nhập
    };

    const login = async (e) => {
        e.preventDefault();
        setErr(""); // Reset lỗi trước khi gửi

        if (user.username === "" || user.password === "") {
            setErr("Vui lòng nhập tên đăng nhập và mật khẩu!");
            return;
        }

        try {
            setLoading(true);

            // Bước 1: Gửi yêu cầu đăng nhập và nhận JWT
            let res = await Apis.post(endpoints['login'], {
                ...user
            });

            // Kiểm tra trạng thái HTTP, nếu 200 OK thì thành công
            if (res.status === 200) {
                // Bước 2: Lưu token và lấy thông tin người dùng
                cookie.save('token', res.data.token);
                // Lấy thông tin người dùng từ kết quả đăng nhập
                const userData = res.data.user;

                // Bước 2.1: LƯU TOÀN BỘ ĐỐI TƯỢNG NGƯỜI DÙNG VÀO COOKIE
                cookie.save('user', userData);

                // Bước 3: Cập nhật context người dùng và chuyển hướng
                dispatch({
                    "type": "login",
                    "payload": userData
                });
                
                let next = q.get('next');
                nav(next === null ? "/" : next);
            } else {
                setErr("Đăng nhập thất bại. Vui lòng thử lại.");
            }
        } catch (ex) {
            setErr("Tên đăng nhập hoặc mật khẩu không chính xác!");
            console.error(ex);
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
                            <h2 className="text-center text-success mb-4">ĐĂNG NHẬP NGƯỜI DÙNG</h2>
                            {err && <Alert variant="danger" className="mt-2">{err}</Alert>}
                            <Form onSubmit={login}>
                                {info.map(i => (
                                    <Form.Group key={i.field} className="mb-3">
                                        <Form.Label>{i.title}</Form.Label>
                                        <Form.Control 
                                            name={i.field}
                                            value={user[i.field]} 
                                            onChange={change} 
                                            type={i.type} 
                                            placeholder={i.title} 
                                            required 
                                        />
                                    </Form.Group>
                                ))}
                                <div className="text-center">
                                    {loading ? (
                                        <MySpinner />
                                    ) : (
                                        <Button variant="success" type="submit">
                                            Đăng nhập
                                        </Button>
                                    )}
                                </div>
                            </Form>
                            <p className="text-center mt-3">
                                <Link to="/register">Đăng ký tài khoản</Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
