// src/components/MedicalRecordsPage.js

import React, { useEffect, useState } from 'react';
import { Alert, Card, Table, ListGroup, Tab, Tabs } from 'react-bootstrap';
import cookie from 'react-cookies';
import { authApis, endpoints } from '../config/Apis';
import MySpinner from './layout/MySpinner';
import { format } from 'date-fns';

const MedicalRecordsPage = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    useEffect(() => {
        const fetchPatientAndRecords = async () => {
            const user = cookie.load('user');
            const token = cookie.load('token');

            if (!user || user.role !== 'PATIENT' || !token) {
                setMessage('Bạn không có quyền truy cập vào hồ sơ này.');
                setVariant('warning');
                setLoading(false);
                return;
            }

            try {
                // BƯỚC 1: Gọi API backend để lấy thông tin bệnh nhân
                const patientRes = await authApis().get(endpoints['get_current_patient_info']);
                const patientData = patientRes.data;

                if (!patientData || !patientData.id) {
                    setMessage('Không tìm thấy thông tin bệnh nhân của bạn.');
                    setVariant('info');
                    setLoading(false);
                    return;
                }
                
                setPatient(patientData);
                const patientId = patientData.id;

                // BƯỚC 2: Dùng patientId để lấy hồ sơ y tế
                const recordsRes = await authApis().get(endpoints['medical-records'](patientId));
                
                if (Array.isArray(recordsRes.data)) {
                    setMedicalRecords(recordsRes.data);
                } else {
                    console.error("API did not return an array:", recordsRes.data);
                    setMessage('Dữ liệu trả về từ API không phải là mảng.');
                    setVariant('danger');
                }
            } catch (ex) {
                console.error("Lỗi khi tải dữ liệu:", ex);
                if (ex.response && ex.response.status === 401) {
                    setMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                } else if (ex.response && ex.response.status === 404) {
                    setMessage('Bạn chưa có hồ sơ khám bệnh nào.');
                } else {
                    setMessage('Có lỗi xảy ra khi tải hồ sơ khám bệnh.');
                }
                setVariant('danger');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientAndRecords();
    }, []);

    if (loading) {
        return <MySpinner />;
    }

    if (message) {
        return <Alert variant={variant}>{message}</Alert>;
    }
    
    if (!patient) {
        return <Alert variant="danger">Không tìm thấy thông tin bệnh nhân.</Alert>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary mb-4">Hồ sơ khám bệnh của {patient.user.fullName}</h1>
            {medicalRecords.length > 0 ? (
                <Tabs defaultActiveKey="history" id="medical-records-tabs" className="mb-3">
                    <Tab eventKey="history" title="Lịch sử khám bệnh">
                        {medicalRecords.map((record) => (
                            <Card key={record.id} className="mb-3">
                                <Card.Header as="h5">
                                    Ngày khám: {record.examDate ? format(new Date(record.examDate), 'dd/MM/yyyy') : 'Đang cập nhật'}
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <strong>Bác sĩ:</strong> {record.doctorName || 'Đang cập nhật'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Bệnh nhân:</strong> {record.patientName || 'Đang cập nhật'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Chẩn đoán:</strong> {record.diagnosis || 'Đang cập nhật'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Triệu chứng:</strong> {record.symptoms || 'Đang cập nhật'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Phương pháp điều trị:</strong> {record.treatmentPlan || 'Đang cập nhật'}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        ))}
                    </Tab>
                    <Tab eventKey="prescriptions" title="Đơn thuốc">
                        {medicalRecords.map((record) => (
                            record.prescriptions && record.prescriptions.length > 0 ? (
                                <Card key={record.id} className="mb-3">
                                    <Card.Header as="h5">
                                        Đơn thuốc ngày: {record.examDate ? format(new Date(record.examDate), 'dd/MM/yyyy') : 'Đang cập nhật'}
                                    </Card.Header>
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Tên thuốc</th>
                                                    <th>Liều lượng</th>
                                                    <th>Hướng dẫn sử dụng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {record.prescriptions.map((p, idx) => (
                                                    <tr key={idx}>
                                                        <td>{p.medicineName || 'Đang cập nhật'}</td>
                                                        <td>{p.quantity || 'Đang cập nhật'}</td>
                                                        <td>{p.instruction || 'Đang cập nhật'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            ) : null
                        ))}
                    </Tab>
                </Tabs>
            ) : (
                <Alert variant="info">
                    Bạn chưa có hồ sơ khám bệnh nào.
                </Alert>
            )}
        </div>
    );
};

export default MedicalRecordsPage;