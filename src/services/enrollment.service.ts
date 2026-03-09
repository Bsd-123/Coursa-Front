import axios from './axios';
import type { Enrollment } from '../types/enrollment.types'; // וודא שהנתיב תואם
//import { loginByToken } from './auth.service';

const url = 'enrollment';

export const getEnrollments = async () => {
    try {
        const token = localStorage.getItem("token")|| ""; 
        const response = await axios.get(`${url}/myCourses`, {
        headers: { Authorization: `Bearer ${token}`}
    });
        return response.data;
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        throw error;
    }
};

/**
 * בדרך כלל ב-Enrollment המפתח מורכב מ-UserId ו-CourseId.
 * אם ה-API שלך תומך בשליפה לפי מזהה ייחודי או לפי שילוב, התאם את הפרמטרים כאן.
 */
export const getMyEnrollment = async ( courseId: number) => {
    try {
        const token = localStorage.getItem("token")|| "";
        const response = await axios.get(`${url}/myEnrollments/${courseId}`,{
        headers: { Authorization: `Bearer ${token}`}
    });
        return response.data;
    } catch (error) {
        console.error(`Error fetching enrollment for you and course ${courseId}:`, error);
        throw error;
    }
};

export const addEnrollment = async (newEnrollment: Enrollment) => {
    try {
        const response = await axios.post(url, newEnrollment);
        return response.data;
    } catch (error) {
        console.error("Error adding enrollment:", error);
        throw error;
    }
};

export const updateEnrollment = async (id: number, updatedEnrollment: Enrollment) => {
    try {
        const response = await axios.put(`${url}/${id}`, updatedEnrollment);
        return response.data;
    } catch (error) {
        console.error(`Error updating enrollment for id ${id}:`, error);
        throw error;
    }
};

export const deleteEnrollment = async (userId: number, courseId: number) => {
    try {
        const response = await axios.delete(`${url}/${userId}/${courseId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting enrollment for user ${userId}:`, error);
        throw error;
    }
};