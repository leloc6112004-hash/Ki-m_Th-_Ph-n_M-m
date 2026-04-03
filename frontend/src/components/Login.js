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
        setErr(""); 
    };

    const login = async (e) => {
        e.preventDefault();
        setErr(""); 

        if (user.username === "" || user.password === "") {
            setErr("Vui lòng nhập tên đăng nhập và mật khẩu!");
            return;
        }

        try {
            setLoading(true);

            
            let res = await Apis.post(endpoints['login'], {
                ...user
            });

           
            if (res.status === 200) {
              
                cookie.save('token', res.data.token);
              
                const userData = res.data.user;

             
                cookie.save('user', userData);

               
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
