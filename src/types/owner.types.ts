import type { User } from "./user.types";

export type Owner = {
    id: number;
    user: User;
    ownerName: string;
    image?: string;
    percentage: number;
    paymentNumber?: string | null;
    fileImage?: File | null;
}