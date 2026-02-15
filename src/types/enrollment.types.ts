import type { Coupon } from "./coupon.types";
import type { Course } from "./course.types";
import type { User } from "./user.types";

export type Enrollment = {
    userId: number;
    courseId: number;
    startDate?: Date | string | null;
    endDate: Date | string; 
    status?: boolean;
    fullPrice: number;                 // double
    paymentNumber: number;             
    receptionNumber?: number | null;
    coupon?: Coupon | null;
    course?: Course;
    user?: User;
}