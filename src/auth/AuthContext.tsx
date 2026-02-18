import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/user.types";

type AuthStateType = {
    user: User | null,
}

type AuthContextType = AuthStateType & {
    setUser: (user: User) => void
    isAuthonticated: boolean
    isInitialized: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

type Props = {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthStateType>({ user: null })

    const setUser = (user: User) => {
        setAuthState({ ...authState, user })
    }
    return <AuthContext.Provider value={{ ...authState, setUser, isAuthonticated: !!authState.user, isInitialized: false }}>
        {children}
    </AuthContext.Provider>
}