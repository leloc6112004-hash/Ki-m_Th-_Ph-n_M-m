import axios from "axios";
import cookie from 'react-cookies'

const BASE_URL = "http://localhost:8080/App/api/";

export const endpoints = {
   'medicines': '/medicines',
   'register': '/users',
    'login': '/login',
    'doctors': '/doctors',
    'specialties': '/specialties',
    'appointments': '/appointments',
    'users': '/users',
    'get_current_patient_info': '/patients/me',
    'user-details': (userId) => `/users/${userId}`, 
    'update-profile': (userId) => `/users/${userId}`,
    "medical-records": (patientId) => `/patients/${patientId}/medical-records`,
    'doctor-appointments': 'doctors/my-appointments',
    'my-notifications': '/patients/my-notifications',
    'doctor-patients': '/doctors/patients',
    'doctor-appointments-confirm': '/doctors/appointments/{appointmentId}/confirm',
     "prescriptions": "/prescriptions/create",
     'create-medical-records': '/medical-records',
      'medical-records-by-patient': '/medical-records/by-patient',
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