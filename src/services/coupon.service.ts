import axios from './axios';
import type { Coupon } from '../types/coupon.types'; // ודאי שהנתיב והשם תואמים למה שהגדרת

const url = 'coupons';

export const getCoupons = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching coupons:", error);
        throw error;
    }
};

export const getCouponById = async (id: number) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching coupon with id ${id}:`, error);
        throw error;
    }
};

export const addCoupon = async (newCoupon: Coupon) => {
    try {
        const response = await axios.post(url, newCoupon);
        return response.data;
    } catch (error) {
        console.error("Error adding coupon:", error);
        throw error;
    }
};

export const updateCoupon = async (id: number, updatedCoupon: Coupon) => {
    try {
        const response = await axios.put(`${url}/${id}`, updatedCoupon);
        return response.data;
    } catch (error) {
        console.error(`Error updating coupon with id ${id}:`, error);
        throw error;
    }
};

export const deleteCoupon = async (id: number) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting coupon with id ${id}:`, error);
        throw error;
    }
};