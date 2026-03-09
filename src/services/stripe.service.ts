import type { Course } from "../types/course.types";
import axios from "./axios";

export const BuyCourse = async (course: Course | null ) => {
    try {
        const token = localStorage.getItem("token")|| ""
        const response = await axios.post(`/Payments/buy`, course, { headers: { Authorization: `Bearer ${token}`}});
        return response
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        throw error;
    }
};