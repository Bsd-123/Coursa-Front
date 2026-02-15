import axios from './axios';
import type { Lesson } from '../types/lesson.types'; // ודאי שהנתיב תואם

const url = 'lessons';

export const getLessons = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching lessons:", error);
        throw error;
    }
};

// שליפת כל השיעורים ששייכים לקורס מסוים
export const getLessonsByCourseId = async (courseId: number) => {
    try {
        const response = await axios.get(`${url}/course/${courseId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching lessons for course ${courseId}:`, error);
        throw error;
    }
};

export const getLessonById = async (id: number) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching lesson with id ${id}:`, error);
        throw error;
    }
};

export const addLesson = async (newLesson: Lesson) => {
    try {
        const response = await axios.post(url, newLesson);
        return response.data;
    } catch (error) {
        console.error("Error adding lesson:", error);
        throw error;
    }
};

export const updateLesson = async (id: number, updatedLesson: Lesson) => {
    try {
        const response = await axios.put(`${url}/${id}`, updatedLesson);
        return response.data;
    } catch (error) {
        console.error(`Error updating lesson with id ${id}:`, error);
        throw error;
    }
};

export const deleteLesson = async (id: number) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting lesson with id ${id}:`, error);
        throw error;
    }
};