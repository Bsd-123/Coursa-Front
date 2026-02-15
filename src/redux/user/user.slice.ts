import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user.types";

type UserState = {
    users: User[]
}

const initialState: UserState = {
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            console.log(action);
            state.users = action.payload
        },
        addUsers: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(c => c.id === action.payload.id)
            if (index !== -1) {
                state.users[index] = action.payload
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        }
    }
})

export const { setUsers, addUsers, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer