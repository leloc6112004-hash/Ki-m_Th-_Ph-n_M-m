import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Spinner, Card, Row, Col, Badge } from 'react-bootstrap';
import { authApis, endpoints } from '../config/Apis';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFileMedical, FaUserInjured, FaStethoscope, FaClipboardList, FaArrowRight, FaCalendarCheck } from 'react-icons/fa';

const MedicalRecordForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Data states
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    
    // Form states
    const [selectedApp, setSelectedApp] = useState(location.state?.appointment || null);
    const [autoPatientId, setAutoPatientId] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [symptoms, setSymptoms] = useState('');
    
    // UI states
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Tải cả lịch hẹn và danh sách bệnh nhân để tra cứu ID
                const [aRes, pRes] = await Promise.all([
                    authApis().get(endpoints['my-appointments-doctor']),
                    authApis().get(endpoints['doctor-patients'])
                ]);

                if (aRes.data.status === 200) {
                    const confirmedApps = aRes.data.data.filter(app => 
                        app.status === 'confirmed' || app.status === 'CONFIRMED'
                    );
                    setAppointments(confirmedApps);
                }
                if (pRes.data.status === 200) setPatients(pRes.data.data);

            } catch (err) {
                console.error(err);
                setMessage({ type: 'danger', text: 'Không thể tải dữ liệu.' });
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    // Tự động tìm Patient ID khi thay đổi Lịch hẹn
    useEffect(() => {
        if (selectedApp && patients.length > 0) {
            // Tìm bệnh nhân có tên khớp với tên trong lịch hẹn
            const p = patients.find(p => p.fullName === selectedApp.patientName);
            if (p) {
                setAutoPatientId(p.id);
            } else {
                setAutoPatientId('');
            }
        }
    }, [selectedApp, patients]);

    const handleSelectApp = (e) => {
        const appId = e.target.value;
        const app = appointments.find(a => a.id.toString() === appId.toString());
        setSelectedApp(app);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedApp || !autoPatientId) {
            setMessage({ type: 'danger', text: 'Lỗi: Không tìm thấy mã định danh bệnh nhân. Vui lòng kiểm tra lại tên bệnh nhân.' });
            return;
        }

        try {
            setIsSubmitting(true);
            const medicalRecordData = {
                patientId: parseInt(autoPatientId), // Lấy ID đã tra cứu được
                appointmentId: parseInt(selectedApp.id),
                diagnosis: diagnosis,
                symptoms: symptoms
            };

            const res = await authApis().post(endpoints['create-medical-record'], medicalRecordData);
            
            if (res.data.status === 200 || res.status === 201) {
                setMessage({ type: 'success', text: 'Tạo hồ sơ bệnh án thành công!' });
                setTimeout(() => {
                    navigate("/prescriptions", { 
                        state: { 
                            patientId: autoPatientId,
                            patientName: selectedApp.patientName 
                        } 
                    });
                }, 1500);
            }
        } catch (err) {
            setMessage({ type: 'danger', text: err.response?.data?.message || 'Lỗi server (400 Bad Request).' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Container className="text-center my-5"><Spinner animation="border" variant="primary" /></Container>;

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="border-0 shadow-lg">
                        <Card.Header className="bg-primary text-white py-4 border-0">
                            <h3 className="mb-0 fw-bold text-center"><FaFileMedical className="me-2" /> KHÁM BỆNH & LẬP HỒ SƠ</h3>
                        </Card.Header>
                        <Card.Body className="p-4 p-md-5">
                            {message && <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>{message.text}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold text-primary"><FaCalendarCheck className="me-2" />Chọn Lịch Hẹn Đang Khám</Form.Label>
                                    <Form.Select
                                        className="bg-light border-0 py-3 shadow-sm"
                                        value={selectedApp?.id || ''}
                                        onChange={handleSelectApp}
                                        required
                                    >
                                        <option value="">-- Chọn lịch hẹn để lấy thông tin tự động --</option>
                                        {appointments.map(a => (
                                            <option key={a.id} value={a.id}>
                                                {a.patientName} - {a.appointmentDate}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                {selectedApp && (
                                    <div className="bg-info bg-opacity-10 p-3 rounded mb-4 border-start border-4 border-info">
                                        <Row className="align-items-center">
                                            <Col xs={8}>
                                                <small className="text-muted text-uppercase fw-bold">Thông tin bệnh nhân:</small>
                                                <h5 className="mb-0 fw-bold">{selectedApp.patientName}</h5>
                                            </Col>
                                            <Col xs={4} className="text-end">
                                                <Badge bg={autoPatientId ? "success" : "danger"} className="p-2">
                                                    {autoPatientId ? `Mã BN: #${autoPatientId}` : "Không tìm thấy mã!"}
                                                </Badge>
                                            </Col>
                                        </Row>
                                    </div>
                                )}

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold"><FaClipboardList className="me-2 text-danger" />Triệu chứng</Form.Label>
                                    <Form.Control as="textarea" rows={3} className="bg-light border-0 shadow-sm" placeholder="Mô tả triệu chứng..." value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold"><FaStethoscope className="me-2 text-success" />Chẩn đoán</Form.Label>
                                    <Form.Control as="textarea" rows={3} className="bg-light border-0 shadow-sm" placeholder="Nhập kết luận bệnh lý..." value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
                                </Form.Group>
                                
                                <div className="d-grid mt-5">
                                    <Button variant="primary" type="submit" size="lg" className="rounded-pill fw-bold py-3 shadow" disabled={isSubmitting || !autoPatientId}>
                                        {isSubmitting ? <Spinner size="sm" /> : <><FaArrowRight className="me-2" /> LƯU HỒ SƠ & SANG KÊ ĐƠN</>}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MedicalRecordForm;
