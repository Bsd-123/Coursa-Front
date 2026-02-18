import type { User } from "./user.types";

export type Owner = {
    id: number;
    user: User | null;
    ownerName: string;
    image?: string;
    percentage: number;
    paymentNumber?: string;
    fileImage?: File | null;
}