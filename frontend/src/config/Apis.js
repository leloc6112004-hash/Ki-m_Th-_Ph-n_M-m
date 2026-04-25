import axios from "axios";
import cookie from 'react-cookies'

const BASE_URL = "http://localhost:8080/App/api";
const HOST = "http://localhost:8080";

export const endpoints = {
    'login': '/login',
    'register': '/users',
    'profile': '/profile',
    'update-profile': (userId) => `/users/${userId}`,
    'current-patient': '/patients/me',
    'medicines': '/medicines',
    'doctors': '/doctors',
    'specialties': '/doctors/specialties',
    'appointments': '/appointments',
    'my-appointments-patient': '/patients/my-appointments',
    'my-appointments-doctor': '/doctors/my-appointments',
    'confirm-appointment': (id) => `/doctors/appointments/${id}/confirm`,
    'doctor-patients': '/doctors/patients',
    'create-medical-record': '/medical-records',
    'medical-records-patient': (patientId) => `/patients/${patientId}/medical-records`,
    'medical-records-history': (patientId) => `/medical-records/by-patient/${patientId}`,
    // Sửa đúng theo PrescriptionController.java
    'create-prescription': '/prescriptions/create',
    'vnpay-url': (billId) => `/payments/vnpay-url/${billId}`,
}

export const getImageUrl = (path) => {
    const defaultAvt = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    if (!path || path === "null" || path === "") return defaultAvt;
    if (typeof path === 'string' && (path.startsWith("http://") || path.startsWith("https://"))) {
        return path;
    }
    return `${HOST}${path}`;
}

export const authApis = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${cookie.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
})
