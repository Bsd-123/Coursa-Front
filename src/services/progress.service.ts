import axios from './axios';
import type { Progress } from '../types/progress.types';

const url = 'progresses';

export const getProgresses = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching progresses:", error);
        throw error;
    }
};

// שליפת התקדמות ספציפית לפי משתמש ושיעור
export const getProgressByIds = async (userId: number, lessonId: number) => {
    try {
        const response = await axios.get(`${url}/${userId}/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching progress for user ${userId} and lesson ${lessonId}:`, error);
        throw error;
    }
};

// הוספת התקדמות חדשה (למשל כשהמשתמש פותח שיעור פעם ראשונה)
export const addProgress = async (newProgress: Progress) => {
    try {
        const response = await axios.post(url, newProgress);
        return response.data;
    } catch (error) {
        console.error("Error adding progress:", error);
        throw error;
    }
};

// עדכון התקדמות (למשל עדכון השניות שצפה או תאריך צפייה אחרון)
export const updateProgress = async (userId: number, lessonId: number, updatedProgress: Progress) => {
    try {
        const response = await axios.put(`${url}/${userId}/${lessonId}`, updatedProgress);
        return response.data;
    } catch (error) {
        console.error(`Error updating progress for user ${userId}:`, error);
        throw error;
    }
};

// מחיקת התקדמות
export const deleteProgress = async (userId: number, lessonId: number) => {
    try {
        const response = await axios.delete(`${url}/${userId}/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting progress for user ${userId}:`, error);
        throw error;
    }
};