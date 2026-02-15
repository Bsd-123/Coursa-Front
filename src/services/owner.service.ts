import axios from './axios';
import type { Owner } from '../types/owner.types';

const url = 'owners';

export const getOwners = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching owners:", error);
        throw error;
    }
};

export const getOwnerById = async (id: number) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching owner with id ${id}:`, error);
        throw error;
    }
};

// פונקציית הוספה המשתמשת ב-FormData עבור התמונה
export const addOwner = async (owner: Owner) => {
    const formData = new FormData();
    
    // מעבר על כל השדות והוספתם ל-FormData
    formData.append('ownerName', owner.ownerName);
    formData.append('userId', owner.user.id.toString());
    formData.append('percentage', owner.percentage.toString());
    if (owner.paymentNumber) formData.append('paymentNumber', owner.paymentNumber);
    
    // הוספת הקובץ במידה וקיים
    if (owner.fileImage) {
        formData.append('fileImage', owner.fileImage);
    }

    try {
        const response = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding owner:", error);
        throw error;
    }
};

export const updateOwner = async (id: number, owner: Owner) => {
    const formData = new FormData();
    formData.append('ownerName', owner.ownerName);
    formData.append('userId', owner.user.id.toString());
    formData.append('percentage', owner.percentage.toString());
    if (owner.paymentNumber) formData.append('paymentNumber', owner.paymentNumber);
    
    if (owner.fileImage) {
        formData.append('fileImage', owner.fileImage);
    }
    
    try {
        const response = await axios.put(`${url}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error(`Error updating owner with id ${id}:`, error);
        throw error;
    }
};

export const deleteOwner = async (id: number) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting owner with id ${id}:`, error);
        throw error;
    }
};