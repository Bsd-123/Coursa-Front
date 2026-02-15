import axios from './axios';
import type { Course } from '../types/course.types'; // ודאי שהנתיב תואם לקובץ הטיפוסים שלך

const url = 'courses';

export const getCourses = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

export const getCourseById = async (id: number) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching course with id ${id}:`, error);
        throw error;
    }
};

export const addCourse = async (newCourse: Course) => {
    try {
        const response = await axios.post(url, newCourse);
        return response.data;
    } catch (error) {
        console.error("Error adding course:", error);
        throw error;
    }
};

export const updateCourse = async (id: number, updatedCourse: Course) => {
    try {
        const response = await axios.put(`${url}/${id}`, updatedCourse);
        return response.data;
    } catch (error) {
        console.error(`Error updating course with id ${id}:`, error);
        throw error;
    }
};

export const deleteCourse = async (id: number) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting course with id ${id}:`, error);
        throw error;
    }
};