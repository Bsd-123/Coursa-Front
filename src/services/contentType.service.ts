import axios from './axios';
import type { ContentType } from '../types/contentType.types'; 

const url = 'contentTypes';

export const getContentTypes = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching content types:", error);
        throw error;
    }
};

export const getContentTypeById = async (id: number) => {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
};

export const addContentType = async (newType: ContentType) => {
    const response = await axios.post(url, newType);
    return response.data;
};

export const updateContentType = async (id: number, updatedType: ContentType) => {
    const response = await axios.put(`${url}/${id}`, updatedType);
    return response.data;
};

export const deleteContentType = async (id: number) => {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
};