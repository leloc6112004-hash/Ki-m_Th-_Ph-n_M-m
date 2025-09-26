import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Image, Row, Col } from 'react-bootstrap';
import { FaUserCircle, FaEnvelope, FaPhone, FaVenusMars, FaSave } from 'react-icons/fa';
import cookie from 'react-cookies';
import { authApis, endpoints } from '../config/Apis';
import MySpinner from './layout/MySpinner';

const ProfileEditPage = () => {
    const [user, setUser] = useState(cookie.load('user') || null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [newAvatar, setNewAvatar] = useState(null);

    useEffect(() => {
        if (user) {
            // Khởi tạo state của form với thông tin hiện có của người dùng
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                gender: user.gender || '',
                avatar: user.avatar || ''
            });
        }
    }, [user]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        avatar: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAvatar(file); // Lưu file thật sự vào state newAvatar
            setFormData({ ...formData, avatar: URL.createObjectURL(file) }); // Cập nhật đường dẫn để hiển thị preview
        }
        };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const form = new FormData();
        form.append('fullName', formData.fullName);
        form.append('email', formData.email);
        form.append('phoneNumber', formData.phoneNumber);
        form.append('gender', formData.gender);
        if (newAvatar) {
            form.append('avatar', newAvatar);
        }

        try {
            const res = await authApis().patch(endpoints['update-profile'](user.id), form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });

            if (res.status === 200) {
                setMessage('Cập nhật hồ sơ thành công!');
                setVariant('success');
                // Cập nhật lại cookie
                cookie.save('user', res.data, { path: '/' });
                setUser(res.data);
            }
        } catch (ex) {
            console.error("Lỗi khi cập nhật hồ sơ:", ex);
            setMessage('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.');
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <Alert variant="danger" className="mt-5 text-center">Vui lòng đăng nhập để chỉnh sửa hồ sơ.</Alert>;
    }

    return (
        <Container className="my-5">
            <h1 className="text-center text-primary mb-4">Chỉnh sửa hồ sơ cá nhân</h1>
            {message && <Alert variant={variant}>{message}</Alert>}
            
            <Card className="p-4 shadow">
                <Form onSubmit={handleFormSubmit}>
                    <Row className="mb-4">
                        <Col md={4} className="text-center">
                            <Image
                                src={formData.avatar || "https://res.cloudinary.com/dxxht1d6p/image/upload/v1703222122/h64z93p9q2u1a5v8u9s3.png"}
                                roundedCircle
                                fluid
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                className="mb-3"
                            />
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Thay đổi ảnh đại diện</Form.Label>
                                <Form.Control type="file" onChange={handleAvatarChange} />
                            </Form.Group>
                        </Col>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label><FaUserCircle className="me-2" />Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><FaPhone className="me-2" />Số điện thoại</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><FaVenusMars className="me-2" />Giới tính</Form.Label>
                                <Form.Select name="gender" value={formData.gender} onChange={handleInputChange}>
                                    <option value="">Chọn giới tính</option>
                                    <option value="MALE">Nam</option>
                                    <option value="FEMALE">Nữ</option>
                                    
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <MySpinner /> : <><FaSave className="me-2" />Lưu thay đổi</>}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default ProfileEditPage;