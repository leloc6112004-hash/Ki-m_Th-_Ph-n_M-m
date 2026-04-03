import React, { useContext } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignOutAlt, FaNotesMedical, FaCalendarAlt, FaCalendarCheck, FaUserInjured, FaPills, FaFileMedical } from 'react-icons/fa';

import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import { MyUserContext } from '../../config/MyContexts';

const Header = () => {
    const [user, dispatch] = useContext(MyUserContext);
    const nav = useNavigate();

    const handleLogout = () => {
        cookie.remove('token');
        cookie.remove('user');
        cookie.remove('patientId');
        cookie.remove('doctorId');
        dispatch({
            "type": "logout"
        });
        nav("/login");
    };

    const defaultAvatarUrl = "/avatar-default.png";
    const avatarUrl = (user && user.avatar) ? user.avatar : defaultAvatarUrl;

    const patientLinks = (
        <>
            <LinkContainer to="/booking">
                <Nav.Link><FaCalendarAlt className="me-1" /> Đặt lịch</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/notifications">
                <Nav.Link><FaCalendarCheck className="me-1" /> Thông báo của tôi</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/medical-records">
                <Nav.Link><FaNotesMedical className="me-1" /> Hồ sơ bệnh án</Nav.Link>
            </LinkContainer>
        </>
    );

    const doctorLinks = (
        <>
            <LinkContainer to="/doctors/my-appointments">
                <Nav.Link><FaCalendarCheck className="me-1" /> Lịch làm việc</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/patients">
                <Nav.Link><FaUserInjured className="me-1" /> Bệnh nhân</Nav.Link>
            </LinkContainer>
             <LinkContainer to="/prescriptions">
                <Nav.Link> <FaPills className="me-1" /> Kê đơn thuốc</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/doctor/create-medical-record">
                <Nav.Link> <FaFileMedical className="me-1" /> Tạo hồ sơ</Nav.Link>
            </LinkContainer>
        </>
    );

    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Phòng khám QH</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {user ? (
                            <>
                                {/* Hiển thị các liên kết dựa trên vai trò */}
                                {user.role === 'DOCTOR' ? doctorLinks : patientLinks}

                                {/* Các liên kết chung cho người dùng đã đăng nhập */}
                                <LinkContainer to="/profile">
                                    <Nav.Link className="d-flex align-items-center">
                                        <Image
                                            src={avatarUrl}
                                            className="rounded-circle me-2"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                        <span>{user.fullName}</span>
                                    </Nav.Link>
                                </LinkContainer>
                                <Nav.Link onClick={handleLogout}><FaSignOutAlt className="me-1" /> Đăng xuất</Nav.Link>
                            </>
                        ) : (
                            <>
                                {/* Giao diện khi chưa đăng nhập */}
                                <LinkContainer to="/register">
                                    <Nav.Link>Đăng ký</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <Nav.Link>Đăng nhập</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;