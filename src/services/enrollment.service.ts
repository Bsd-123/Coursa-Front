import axios from './axios';
import type { Enrollment } from '../types/enrollment.types'; // וודא שהנתיב תואם

const url = 'enrollments';

export const getEnrollments = async () => {
    try {
        const response = await axios.get(url);
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
export const getEnrollmentByIds = async (userId: number, courseId: number) => {
    try {
        const response = await axios.get(`${url}/${userId}/${courseId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching enrollment for user ${userId} and course ${courseId}:`, error);
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

export const updateEnrollment = async (userId: number, courseId: number, updatedEnrollment: Enrollment) => {
    try {
        const response = await axios.put(`${url}/${userId}/${courseId}`, updatedEnrollment);
        return response.data;
    } catch (error) {
        console.error(`Error updating enrollment for user ${userId}:`, error);
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