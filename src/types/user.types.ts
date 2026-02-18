export type User ={
    id: number
    name: string,
    email: string,
    password: string
    role: Role
}

export type Role = {
    role: 'user' | 'admin' | 'owner'
}