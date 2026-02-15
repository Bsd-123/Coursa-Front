import type { Course } from "./course.types";
import type { User } from "./user.types";

export type Coupon ={
    id : number,
    name : string,
    course : Course,
    isPercentages : boolean,
    value : number,
    startDate : Date,
    endDate : Date,
    user: User,
    minPrice : number,
    status : boolean
}




