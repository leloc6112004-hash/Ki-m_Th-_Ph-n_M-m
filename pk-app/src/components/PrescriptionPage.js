import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert, Spinner, Badge, Table } from 'react-bootstrap';
import { authApis, endpoints } from '../config/Apis';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPills, FaTrash, FaFilePrescription, FaUserMd, FaClipboardList, FaClock } from 'react-icons/fa';

const PrescriptionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [medicines, setMedicines] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    
    // State form
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [prescriptionItems, setPrescriptionItems] = useState([]);
    
    // State nhập thuốc
    const [currentMedicine, setCurrentMedicine] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [instructions, setInstructions] = useState('');

    const [loading, setLoading] = useState(true);
    const [loadingRecords, setLoadingRecords] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                // Tải thuốc
                const res = await authApis().get(endpoints['medicines']);
                if (res.data.status === 200) setMedicines(res.data.data);

                // Nếu có patientId từ trang bệnh án chuyển sang, tự động tải hồ sơ bệnh nhân đó
                if (location.state?.patientId) {
                    await fetchRecords(location.state.patientId);
                }
            } catch (err) {
                setError("Lỗi tải dữ liệu.");
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    const fetchRecords = async (patientId) => {
        setLoadingRecords(true);
        try {
            const res = await authApis().get(endpoints['medical-records-history'](patientId));
            if (res.data.status === 200) {
                const records = res.data.data || [];
                setMedicalRecords(records);
                // Tự động chọn bệnh án mới nhất (vừa tạo)
                if (records.length > 0) setSelectedRecord(records[0]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingRecords(false);
        }
    };

    const handleAddItem = () => {
        const medicine = medicines.find(m => m.id.toString() === currentMedicine);
        if (!medicine || !dosage || !frequency) return;
        setPrescriptionItems([...prescriptionItems, {
            medicineId: parseInt(medicine.id),
            name: medicine.name,
            unit: medicine.unit,
            dosage, frequency, instructions
        }]);
        setCurrentMedicine(''); setDosage(''); setFrequency(''); setInstructions('');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!selectedRecord || prescriptionItems.length === 0) {
            setError("Vui lòng chọn hồ sơ bệnh án và thêm thuốc.");
            return;
        }

        try {
            setIsSubmitting(true);
            const requestBody = {
                medicalRecordId: parseInt(selectedRecord.id),
                medicines: prescriptionItems.map(item => ({
                    medicineId: item.medicineId,
                    dosage: item.dosage,
                    frequency: item.frequency,
                    instructions: item.instructions
                }))
            };
            const res = await authApis().post(endpoints['create-prescription'], requestBody);
            if (res.status === 201) {
                alert("Kê đơn thành công!");
                navigate("/doctors/my-appointments");
            }
        } catch (err) {
            setError(err.response?.data || "Lỗi khi lưu đơn thuốc.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Container className="text-center my-5"><Spinner animation="border" variant="primary" /></Container>;

    return (
        <Container className="py-5">
            <div className="mb-4">
                <h2 className="fw-bold text-dark"><FaFilePrescription className="text-primary me-2" /> KÊ ĐƠN THUỐC</h2>
                {location.state?.patientName && <Badge bg="info" className="p-2 mt-2">Đang kê đơn cho: {location.state.patientName}</Badge>}
            </div>

            {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

            <Row className="g-4">
                <Col lg={4}>
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Header className="bg-white py-3 border-0"><h6 className="mb-0 fw-bold"><FaClipboardList className="me-2 text-primary" />Hồ sơ bệnh án (Tự động)</h6></Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-muted">Chọn bệnh án để gán đơn thuốc:</Form.Label>
                                <Form.Select 
                                    className="bg-light border-0 shadow-sm"
                                    value={selectedRecord?.id || ''}
                                    onChange={(e) => setSelectedRecord(medicalRecords.find(r => r.id.toString() === e.target.value))}
                                >
                                    <option value="">-- Chọn bệnh án --</option>
                                    {medicalRecords.map(r => (
                                        <option key={r.id} value={r.id}>Ngày {r.createdDate}: {r.diagnosis}</option>
                                    ))}
                                </Form.Select>
                                {loadingRecords && <Spinner size="sm" className="mt-2" />}
                            </Form.Group>
                            {selectedRecord && (
                                <div className="small bg-info bg-opacity-10 p-2 rounded">
                                    <FaClock className="me-1" /> Ngày khám: <strong>{selectedRecord.createdDate}</strong>
                                </div>
                            )}
                        </Card.Body>
                    </Card>

                    <Card className="border-0 shadow-sm">
                        <Card.Header className="bg-white py-3 border-0"><h6 className="mb-0 fw-bold"><FaPills className="me-2 text-primary" />Thêm thuốc</h6></Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Select className="bg-light border-0" value={currentMedicine} onChange={(e) => setCurrentMedicine(e.target.value)}>
                                    <option value="">-- Tìm chọn thuốc --</option>
                                    {medicines.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Row className="mb-3">
                                <Col xs={6}><Form.Control className="bg-light border-0" placeholder="Liều" value={dosage} onChange={(e) => setDosage(e.target.value)} /></Col>
                                <Col xs={6}><Form.Control className="bg-light border-0" placeholder="Tần suất" value={frequency} onChange={(e) => setFrequency(e.target.value)} /></Col>
                            </Row>
                            <Form.Control as="textarea" rows={2} className="bg-light border-0 mb-3" placeholder="Ghi chú hướng dẫn..." value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                            <Button variant="outline-primary" className="w-100 rounded-pill fw-bold" onClick={handleAddItem}>+ THÊM VÀO ĐƠN</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card className="border-0 shadow-lg h-100">
                        <Card.Header className="bg-white py-3 border-0 d-flex justify-content-between"><h6 className="mb-0 fw-bold">CHI TIẾT ĐƠN THUỐC</h6><Badge bg="primary" pill>{prescriptionItems.length}</Badge></Card.Header>
                        <Card.Body className="p-0">
                            {prescriptionItems.length === 0 ? <div className="text-center py-5 text-muted opacity-50"><FaPills size={50} className="mb-3" /><p>Chưa có thuốc</p></div> : 
                                <>
                                    <Table hover className="align-middle mb-0">
                                        <thead className="table-light"><tr><th className="ps-4">Tên thuốc</th><th>Liều/Tần suất</th><th className="text-end">Xóa</th></tr></thead>
                                        <tbody>
                                            {prescriptionItems.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="ps-4"><div className="fw-bold">{item.name}</div><div className="small text-muted fst-italic">{item.instructions}</div></td>
                                                    <td><Badge bg="info" className="fw-normal">{item.dosage} {item.unit}</Badge><div className="small">{item.frequency}</div></td>
                                                    <td className="text-end pe-4"><Button variant="link" className="text-danger" onClick={() => setPrescriptionItems(prescriptionItems.filter((_, i) => i !== idx))}><FaTrash /></Button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="p-4 bg-light border-top mt-auto">
                                        <Button variant="success" size="lg" className="w-100 rounded-pill fw-bold shadow py-3" onClick={handleSave} disabled={isSubmitting}>
                                            {isSubmitting ? <Spinner size="sm" /> : "XÁC NHẬN & LƯU ĐƠN THUỐC"}
                                        </Button>
                                    </div>
                                </>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PrescriptionPage;
