import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { authApis, endpoints } from '../config/Apis';
import cookie from 'react-cookies';

const PrescriptionPage = () => {
    const [patients, setPatients] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState(''); // Thêm state mới
    const [prescriptionItems, setPrescriptionItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [currentMedicine, setCurrentMedicine] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [instructions, setInstructions] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = authApis();
                const [patientsRes, medicinesRes] = await Promise.all([
                    api.get(endpoints['doctor-patients']),
                    api.get(endpoints['medicines'])
                ]);
                
                setPatients(patientsRes.data || []);
                setMedicines(medicinesRes.data || []);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
                setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Lấy hồ sơ bệnh án khi một bệnh nhân được chọn
    useEffect(() => {
        const fetchMedicalRecords = async () => {
            if (selectedPatientId) {
                try {
                    const api = authApis();
                    const res = await api.get(`${endpoints['medical-records-by-patient']}/${selectedPatientId}`);
                    setMedicalRecords(res.data);
                } catch (err) {
                    console.error("Lỗi khi tải hồ sơ bệnh án:", err);
                    setError("Không thể tải hồ sơ bệnh án của bệnh nhân này.");
                }
            } else {
                setMedicalRecords([]);
                setSelectedMedicalRecordId('');
            }
        };
        fetchMedicalRecords();
    }, [selectedPatientId]);


    const handleAddMedicine = (e) => {
        e.preventDefault();
        const medicine = medicines.find(m => m.id.toString() === currentMedicine);
        if (medicine && dosage && frequency) {
            setPrescriptionItems([...prescriptionItems, {
                medicineId: medicine.id,
                name: medicine.name,
                dosage,
                frequency,
                instructions
            }]);
            setCurrentMedicine('');
            setDosage('');
            setFrequency('');
            setInstructions('');
        } else {
            setError("Vui lòng điền đầy đủ thông tin thuốc.");
        }
    };

    const handleRemoveMedicine = (index) => {
        setPrescriptionItems(prescriptionItems.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        if (!selectedMedicalRecordId) {
            setError("Vui lòng chọn một hồ sơ bệnh án.");
            setIsSubmitting(false);
            return;
        }
        if (prescriptionItems.length === 0) {
            setError("Đơn thuốc phải có ít nhất một loại thuốc.");
            setIsSubmitting(false);
            return;
        }

        try {
            const api = authApis();
            const prescriptionData = {
                medicalRecordId: parseInt(selectedMedicalRecordId), // Gửi ID hồ sơ bệnh án chính xác
                medicines: prescriptionItems.map(item => ({
                    medicineId: item.medicineId,
                    dosage: item.dosage,
                    frequency: item.frequency,
                    instructions: item.instructions
                }))
            };

            const res = await api.post(endpoints['prescriptions'], prescriptionData);
            
            if (res.status === 201) {
                setSubmitStatus({ type: 'success', message: 'Đơn thuốc đã được kê thành công!' });
                setSelectedPatientId('');
                setSelectedMedicalRecordId('');
                setPrescriptionItems([]);
            }
        } catch (err) {
            console.error("Lỗi khi gửi đơn thuốc:", err);
            setSubmitStatus({ type: 'error', message: "Đã xảy ra lỗi khi kê đơn. Vui lòng thử lại." });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4 text-primary">Kê Đơn Thuốc</h1>

            {submitStatus && <Alert variant={submitStatus.type === 'success' ? 'success' : 'danger'} className="mb-4">{submitStatus.message}</Alert>}
            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="selectPatient" className="mb-4">
                    <Form.Label><span className="fw-bold">Chọn Bệnh Nhân:</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedPatientId}
                        onChange={(e) => setSelectedPatientId(e.target.value)}
                    >
                        <option value="">-- Chọn bệnh nhân --</option>
                        {patients.filter(p => p && p.userId).map(p => (
                            <option key={p.id} value={p.id}>{p.userId.fullName}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {selectedPatientId && (
                    <Form.Group controlId="selectMedicalRecord" className="mb-4">
                        <Form.Label><span className="fw-bold">Chọn Hồ Sơ Bệnh Án:</span></Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedMedicalRecordId}
                            onChange={(e) => setSelectedMedicalRecordId(e.target.value)}
                        >
                            <option value="">-- Chọn hồ sơ --</option>
                            {medicalRecords.map(record => (
                                <option key={record.id} value={record.id}>
                                    Ngày khám: {new Date(record.createdAt).toLocaleDateString()} - Triệu chứng: {record.symptoms}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                )}
                
                {selectedMedicalRecordId && (
                    <>
                        {/* Các trường form để thêm thuốc */}
                        {/* ... (Đoạn mã form thuốc của bạn) ... */}
                        
                        <Card className="p-4 mb-4">
                            <h4 className="mb-3 text-success">Thông tin đơn thuốc</h4>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="selectMedicine">
                                        <Form.Label>Chọn thuốc</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={currentMedicine}
                                            onChange={(e) => setCurrentMedicine(e.target.value)}
                                        >
                                            <option value="">-- Chọn thuốc --</option>
                                            {medicines.map(med => (
                                                <option key={med.id} value={med.id}>
                                                    {med.name} ({med.unit})
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="dosage">
                                        <Form.Label>Liều lượng</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={dosage}
                                            onChange={(e) => setDosage(e.target.value)}
                                            placeholder="Ví dụ: 1 viên"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="frequency">
                                        <Form.Label>Tần suất</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={frequency}
                                            onChange={(e) => setFrequency(e.target.value)}
                                            placeholder="Ví dụ: 2 lần/ngày"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="instructions" className="mb-3">
                                <Form.Label>Hướng dẫn thêm (tùy chọn)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    placeholder="Uống sau bữa ăn..."
                                />
                            </Form.Group>
                            <Button variant="outline-success" onClick={handleAddMedicine}>
                                + Thêm thuốc
                            </Button>
                        </Card>

                        {/* ... Danh sách thuốc đã thêm và nút gửi ... */}
                        <h4 className="mt-4 mb-3">Đơn thuốc đã thêm:</h4>
                        {prescriptionItems.length > 0 ? (
                            <ListGroup>
                                {prescriptionItems.map((item, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{item.name}</div>
                                            <span className="text-muted">Liều lượng: {item.dosage}, Tần suất: {item.frequency}</span>
                                            {item.instructions && <div className="text-secondary fst-italic">Hướng dẫn: {item.instructions}</div>}
                                        </div>
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveMedicine(index)}>
                                            Xóa
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <Alert variant="info" className="text-center">Chưa có thuốc nào trong đơn.</Alert>
                        )}
                        <div className="d-grid gap-2 mt-4">
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                        Đang gửi...
                                    </>
                                ) : (
                                    'Kê đơn và Gửi'
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </Container>
    );
};

export default PrescriptionPage;