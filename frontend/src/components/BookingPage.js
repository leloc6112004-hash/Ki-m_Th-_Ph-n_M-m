import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import APIs, { authApis, endpoints } from "../config/Apis";
import MySpinner from './layout/MySpinner';

const BookingPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [specialties, setSpecialties] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    useEffect(() => {
        const loadSpecialties = async () => {
            try {
                const res = await APIs.get(endpoints['specialties']);
                if (Array.isArray(res.data)) {
                    setSpecialties(res.data);
                } else {
                    console.error("API did not return an array for specialties:", res.data);
                    setMessage('Có lỗi khi tải chuyên khoa. Vui lòng thử lại sau.');
                    setVariant('danger');
                }
            } catch (ex) {
                console.error("Lỗi khi tải chuyên khoa:", ex);
                setMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
                setVariant('danger');
            } finally {
                setLoading(false);
            }
        };
        loadSpecialties();
    }, []);

    const handleSpecialtyChange = async (e) => {
        const specialtyId = e.target.value;
        setSelectedSpecialty(specialtyId);
        setSelectedDoctor('');
        setDoctors([]);

        if (specialtyId) {
            try {
                const res = await APIs.get(`${endpoints['doctors']}?specialtyId=${specialtyId}`);
                if (Array.isArray(res.data)) {
                    setDoctors(res.data);
                } else {
                    console.error("API did not return an array for doctors:", res.data);
                }
            } catch (ex) {
                console.error("Lỗi khi tải danh sách bác sĩ:", ex);
            }
        }
    };

    const handleAppointmentSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const user = cookie.load('user');
        if (!user || user.role !== 'PATIENT') {
            setMessage('Vui lòng đăng nhập với tư cách Bệnh nhân để đặt lịch hẹn.');
            setVariant('danger');
            return;
        }

        if (!selectedSpecialty || !selectedDoctor || !appointmentDate || !appointmentTime) {
            setMessage('Vui lòng điền đầy đủ thông tin bắt buộc.');
            setVariant('danger');
            return;
        }

        try {
            const appointmentData = {
                doctorId: parseInt(selectedDoctor),
                patientId: user.id,
                "appointmentDate": appointmentDate,
                "appointmentTime": appointmentTime,
                "reason": reason,
                "status": 'pending'
            };

            const res = await authApis().post(endpoints['appointments'], appointmentData);

            if (res.status === 201) {
                // Redirect on success and pass the new appointment data
                navigate('/profile', { state: { newAppointment: res.data } });
            }
        } catch (ex) {
            console.error("Lỗi khi gửi yêu cầu đặt lịch hẹn:", ex);
            setMessage('Có lỗi xảy ra khi đặt lịch hẹn. Vui lòng kiểm tra lại thông tin.');
            setVariant('danger');
        }
    };

    if (loading) {
        return <MySpinner />;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary mb-4">Đặt lịch hẹn khám bệnh</h1>
            {message && <Alert variant={variant}>{message}</Alert>}
            <Form onSubmit={handleAppointmentSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Chọn chuyên khoa:</Form.Label>
                    <Form.Control as="select" value={selectedSpecialty} onChange={handleSpecialtyChange} required>
                        <option value="">-- Chọn chuyên khoa --</option>
                        {specialties.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {selectedSpecialty && (
                    <Form.Group className="mb-3">
                        <Form.Label>Chọn bác sĩ:</Form.Label>
                        <Form.Control as="select" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                            <option value="">-- Chọn bác sĩ --</option>
                            {doctors.length > 0 ? (
                                doctors.map(d => (
                                    <option key={d.id} value={d.id}>{d.users.fullName}</option>
                                ))
                            ) : (
                                <option disabled>Không có bác sĩ trong chuyên khoa này.</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                )}

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày hẹn:</Form.Label>
                            <Form.Control
                                type="date"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Giờ hẹn:</Form.Label>
                            <Form.Control type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Form.Group className="mb-3">
                    <Form.Label>Lý do khám:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Đặt lịch hẹn
                </Button>
            </Form>
        </div>
    );
};

export default BookingPage;