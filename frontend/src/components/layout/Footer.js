

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row className="text-center text-md-start">
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>Phòng khám QH</h5>
                        <p>
                            Nơi chăm sóc sức khỏe toàn diện cho mọi gia đình.
                            Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao,
                            thân thiện và chuyên nghiệp.
                        </p>
                    </Col>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>Thông tin liên hệ</h5>
                        <ul className="list-unstyled">
                            <li>Địa chỉ: 123 Đường Sức Khỏe, Quận Y, TP.HCM</li>
                            <li>Email: info@phongkhamqh.com</li>
                            <li>Điện thoại: (028) 123 4567</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Kết nối với chúng tôi</h5>
                        <div>
                            <a href="#" className="text-white me-3">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-white me-3">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-white">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </Col>
                </Row>
                <hr className="my-3" />
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">&copy; 2025 Phòng khám QH. Mọi quyền được bảo lưu.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;