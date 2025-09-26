import React, { useState, useEffect } from "react";
import { Alert, Container, Spinner, Table, Button } from "react-bootstrap";
import { authApis, endpoints } from "../config/Apis";
import cookie from "react-cookies";

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = cookie.load('token');
                
                if (!token) {
                    setError("Vui lòng đăng nhập lại để xem lịch hẹn.");
                    setLoading(false);
                    return;
                }
                
                const res = await authApis().get(endpoints['doctor-appointments']);
                
                if (res.data) {
                    setAppointments(res.data);
                } else {
                    setAppointments([]);
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    setError("Phiên đăng nhập đã hết hạn hoặc bạn không có quyền truy cập.");
                } else {
                    setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleConfirm = async (appointmentId) => {
        try {
            const api = authApis();
            const res = await api.put(endpoints['doctor-appointments-confirm'].replace('{appointmentId}', appointmentId));
            
            if (res.status === 200) {
                // Lọc ra lịch hẹn vừa được xác nhận khỏi danh sách hiển thị
                setAppointments(prevAppointments => 
                    prevAppointments.filter(app => app.id !== appointmentId)
                );
            }
        } catch (err) {
            console.error("Lỗi khi xác nhận lịch hẹn:", err);
            setError("Không thể xác nhận lịch hẹn. Vui lòng thử lại.");
        }
    };

    if (loading) {
        return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger" className="m-5">{error}</Alert>;
    }

    if (!appointments || appointments.length === 0) {
        return <Alert variant="info" className="m-5">Hiện tại không có lịch hẹn nào.</Alert>;
    }

    return (
        <Container className="my-5">
            <h2 className="text-center text-success mb-4">Lịch làm việc của bạn</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Bệnh nhân</th>
                        <th>Ngày</th>
                        <th>Giờ khám</th>
                        <th>Lý do</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th> 
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((app, index) => (
                        <tr key={app.id}>
                            <td>{index + 1}</td>
                            <td>{app.patientName}</td>
                            <td>{app.appointmentDate.split(' ')[0].split('-').reverse().join('/')}</td>
                            <td>{app.appointmentTime}</td>
                            <td>{app.reason}</td>
                            <td>{app.status}</td>
                            <td>
                                {app.status !== 'Đã xác nhận' && (
                                    <Button 
                                        variant="success" 
                                        size="sm"
                                        onClick={() => handleConfirm(app.id)}
                                    >
                                        Xác nhận
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DoctorAppointments;