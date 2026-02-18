export type User ={
    id: number
    name: string,
    email: string,
    password: string
    role: Role
}

export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    OWNER: 'owner'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];