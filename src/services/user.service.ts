import axios from './axios';
import type { User } from '../types/user.types';

const url = 'users';

// 1. קבלת פרטי המשתמש הנוכחי (לפי ID) - שימושי לדף "הפרופיל שלי"
export const getUserProfile = async (id: number) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user profile for ID ${id}:`, error);
        throw error;
    }
};

// 2. עדכון פרטים אישיים (למשל שינוי שם, אימייל או תמונת פרופיל)
export const updateProfile = async (id: number, updatedData: Partial<User>) => {
    try {
        const response = await axios.put(`${url}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

// 3. למנהל מערכת (Admin): קבלת רשימת כל המשתמשים באתר
export const getAllUsers = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};

// 4. למנהל מערכת: מחיקת משתמש
export const deleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};