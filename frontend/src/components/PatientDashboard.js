

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUserEdit, FaCalendarPlus, FaHistory, FaFileMedical, FaCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const PatientDashboard = () => {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Xin chào, Bệnh nhân!</h1>
            <p className="text-center text-muted mb-5">
                Đây là bảng điều khiển của bạn. Bạn có thể quản lý hồ sơ và lịch hẹn tại đây.
            </p>

            <Row className="g-4 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow h-100 text-center">
                        <Card.Body>
                            <FaUserEdit size={60} className="text-primary mb-3" />
                            <Card.Title>Quản lý hồ sơ</Card.Title>
                            <Card.Text>Cập nhật thông tin cá nhân và hồ sơ sức khỏe.</Card.Text>
                            <Link to="/profile/edit">
                                <Button variant="primary" className="mt-3">Xem chi tiết</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card className="shadow h-100 text-center">
                        <Card.Body>
                            <FaCalendarPlus size={60} className="text-primary mb-3" />
                            <Card.Title>Đặt lịch hẹn</Card.Title>
                            <Card.Text>Đặt lịch khám với bác sĩ theo chuyên khoa.</Card.Text>
                            <Link to="/booking">
                                <Button variant="primary" className="mt-3">Đặt lịch ngay</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card className="shadow h-100 text-center">
                        <Card.Body>
                            <FaCalendarCheck size={60} className="text-primary mb-3" />
                            <Card.Title>Lịch hẹn đã đặt</Card.Title>
                            <Card.Text>Xem và quản lý các lịch hẹn đã đặt của bạn.</Card.Text>
                            <Link to="/my-appointments">
                                <Button variant="primary" className="mt-3">Xem lịch hẹn</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={4}>
                    <Card className="shadow h-100 text-center">
                        <Card.Body>
                            <FaFileMedical size={60} className="text-primary mb-3" />
                            <Card.Title>Lịch sử khám bệnh</Card.Title>
                            <Card.Text>Tra cứu kết quả xét nghiệm và đơn thuốc cũ.</Card.Text>
                            <Link to="/medical-records">
                                <Button variant="primary" className="mt-3">Xem lịch sử</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PatientDashboard;