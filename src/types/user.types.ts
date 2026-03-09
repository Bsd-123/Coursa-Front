export type User ={
    id: number
    email: string,
    name: string,
    password: string
    regDate: Date
    role: Role
    status: boolean
    resetPasswordToken : string
    resetTokenExpires : Date
}

export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    OWNER: 'owner'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];