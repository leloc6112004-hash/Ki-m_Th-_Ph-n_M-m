// src/components/DoctorPatients.js

import React, { useState, useEffect } from "react";
import { Alert, Container, Spinner, Table } from "react-bootstrap";
import { authApis, endpoints } from "../config/Apis";
import { FaUserCircle } from "react-icons/fa";

const DoctorPatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const api = authApis();
                if (!api) {
                    setError("Không thể xác thực. Vui lòng đăng nhập lại.");
                    return;
                }

                const res = await api.get(endpoints['doctor-patients']);
                setPatients(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Lỗi khi tải danh sách bệnh nhân:", err);
                if (err.response) {
                    if (err.response.status === 401) {
                        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    } else if (err.response.status === 403) {
                        setError("Bạn không có quyền xem trang này.");
                    } else if (err.response.status === 404) {
                        setError("Không tìm thấy đường dẫn API. Vui lòng kiểm tra lại cấu hình.");
                    } else {
                        setError("Đã xảy ra lỗi server. Vui lòng thử lại sau.");
                    }
                } else {
                    setError("Không thể kết nối đến server.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) {
        return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger" className="m-5">{error}</Alert>;
    }

    if (!patients || patients.length === 0) {
        return <Alert variant="info" className="m-5">Hiện tại không có bệnh nhân nào.</Alert>;
    }

    return (
        <Container className="my-5">
            <h2 className="text-center text-success mb-4">Danh sách bệnh nhân</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ảnh</th>
                        <th>Tên bệnh nhân</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Điện thoại</th>
                        <th>Địa chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient, index) => (
                        <tr key={patient.id}>
                            <td>{index + 1}</td>
                            <td>
                                {patient.userId.avatar ? 
                                    <img src={patient.userId.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    : <FaUserCircle size={40} className="text-secondary" />
                                }
                            </td>
                            <td>{patient.userId.fullName}</td>
                            <td>{patient.userId.dateOfBirth ? new Date(patient.userId.dateOfBirth).toLocaleDateString() : 'N/A'}</td>
                            <td>{patient.userId.gender === 'male' ? 'Nam' : 'Nữ'}</td>
                            <td>{patient.userId.phoneNumber}</td>
                            <td>{patient.userId.address}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DoctorPatients;