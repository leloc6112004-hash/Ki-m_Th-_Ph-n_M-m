// src/components/pages/Home.js

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUserMd, FaCalendarCheck, FaNotesMedical, FaRegMoneyBillAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <Container className="my-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary">Phòng khám đa khoa QH</h1>
                <p className="lead text-muted mt-3">
                    Nơi chăm sóc sức khỏe toàn diện và tiện lợi cho bạn và gia đình.
                </p>
                
            </div>

            <Row className="g-4">
                <Col md={6} lg={3}>
                    <Card className="shadow-sm h-100 text-center">
                        <Card.Body>
                            <FaUserMd size={50} className="text-info mb-3" />
                            <Card.Title>Đội ngũ chuyên gia</Card.Title>
                            <Card.Text>
                                Với đội ngũ y bác sĩ giàu kinh nghiệm, chúng tôi cam kết mang lại sự chăm sóc tốt nhất.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="shadow-sm h-100 text-center">
                        <Card.Body>
                            <FaCalendarCheck size={50} className="text-info mb-3" />
                            <Card.Title>Đặt lịch trực tuyến</Card.Title>
                            <Card.Text>
                                Dễ dàng đặt lịch hẹn khám bệnh mọi lúc, mọi nơi, không cần chờ đợi.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="shadow-sm h-100 text-center">
                        <Card.Body>
                            <FaNotesMedical size={50} className="text-info mb-3" />
                            <Card.Title>Hồ sơ điện tử</Card.Title>
                            <Card.Text>
                                Quản lý toàn bộ lịch sử khám và đơn thuốc một cách an toàn và bảo mật.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="shadow-sm h-100 text-center">
                        <Card.Body>
                            <FaRegMoneyBillAlt size={50} className="text-info mb-3" />
                            <Card.Title>Thanh toán tiện lợi</Card.Title>
                            <Card.Text>
                                Thanh toán chi phí khám chữa bệnh trực tuyến, nhanh chóng và minh bạch.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;