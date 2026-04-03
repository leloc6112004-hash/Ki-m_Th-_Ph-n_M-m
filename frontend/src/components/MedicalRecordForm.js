import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { authApis, endpoints } from '../config/Apis';

const MedicalRecordForm = () => {
    const [appointments, setAppointments] = useState([]);
    const [appointmentId, setAppointmentId] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [treatmentPlan, setTreatmentPlan] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Lấy danh sách các lịch hẹn của bác sĩ
                const res = await authApis().get(endpoints['doctor-appointments']);
                setAppointments(res.data);
            } catch (err) {
                console.error("Lỗi khi tải danh sách lịch hẹn:", err);
                setMessage({ type: 'danger', text: 'Không thể tải danh sách lịch hẹn. Vui lòng thử lại sau.' });
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);
        
        // Tìm lịch hẹn đã chọn từ danh sách appointments
        const selectedAppointment = appointments.find(a => a.id.toString() === appointmentId);
        
        // Kiểm tra các trường bắt buộc trước khi gửi
        if (!selectedAppointment || !diagnosis || !symptoms || !treatmentPlan) {
            setMessage({ type: 'danger', text: 'Vui lòng điền đầy đủ các thông tin bắt buộc và chọn một lịch hẹn.' });
            setIsSubmitting(false);
            return;
        }

        // --- ĐÂY LÀ PHẦN ĐÃ ĐƯỢC SỬA ĐỂ XỬ LÝ LỖI patientId ---
        // Lấy patientId từ lịch hẹn đã chọn.
        const patientIdToSend = selectedAppointment.patientId;

        // Nếu patientId không tồn tại trong dữ liệu API, hiển thị lỗi và dừng lại.
        if (patientIdToSend === undefined) {
             setMessage({ type: 'danger', text: 'Thông tin bệnh nhân không hợp lệ. Vui lòng kiểm tra lại dữ liệu lịch hẹn.' });
             setIsSubmitting(false);
             return;
        }
        // --- KẾT THÚC PHẦN SỬA ---

        try {
            const medicalRecordData = {
                // Gửi patientId đã được kiểm tra
                patientId: patientIdToSend, 
                appointmentId: parseInt(appointmentId), 
                diagnosis,
                symptoms,
                treatmentPlan
            };
            
            const res = await authApis().post(endpoints['create-medical-records'], medicalRecordData);
            
            if (res.status === 201) {
                setMessage({ type: 'success', text: 'Hồ sơ bệnh án đã được tạo thành công!' });
                setAppointmentId('');
                setDiagnosis('');
                setSymptoms('');
                setTreatmentPlan('');
            }
        } catch (err) {
            console.error("Lỗi khi tạo hồ sơ:", err);
            setMessage({ type: 'danger', text: 'Đã xảy ra lỗi khi tạo hồ sơ. Vui lòng kiểm tra lại.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" />
                <p className="mt-2">Đang tải danh sách lịch hẹn...</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Tạo Hồ Sơ Bệnh Án Mới</h1>
            {message && <Alert variant={message.type}>{message.text}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label><span className="fw-bold">Chọn Lịch Hẹn:</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                        required
                    >
                        <option value="">-- Chọn lịch hẹn --</option>
                        {appointments.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.patientName} - {a.appointmentDate} lúc {a.appointmentTime}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label><span className="fw-bold">Chẩn Đoán:</span></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        required
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label><span className="fw-bold">Triệu Chứng:</span></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        required
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label><span className="fw-bold">Phương Pháp Điều Trị:</span></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={treatmentPlan}
                        onChange={(e) => setTreatmentPlan(e.target.value)}
                        required
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                            Đang tạo...
                        </>
                    ) : (
                        'Tạo Hồ Sơ Bệnh Án'
                    )}
                </Button>
            </Form>
        </Container>
    );
};

export default MedicalRecordForm;