import axios from './axios';
import type { Skill } from '../types/skill.types';

const url = 'skills';

export const getSkills = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching skills:", error);
        throw error;
    }
};

export const getSkillById = async (id: number) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching skill with id ${id}:`, error);
        throw error;
    }
};

// הוספת Skill עם תמונה
export const addSkill = async (skill: Skill) => {
    const formData = new FormData();
    formData.append('name', skill.name);
    
    // שליחת הקובץ לשרת (עבור ה-IFormFile)
    if (skill.fileImage) {
        formData.append('fileImage', skill.fileImage);
    }

    try {
        const response = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding skill:", error);
        throw error;
    }
};

export const updateSkill = async (id: number, skill: Skill) => {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', skill.name);
    
    if (skill.fileImage) {
        formData.append('fileImage', skill.fileImage);
    }

    try {
        const response = await axios.put(`${url}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating skill with id ${id}:`, error);
        throw error;
    }
};

export const deleteSkill = async (id: number) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting skill with id ${id}:`, error);
        throw error;
    }
};
