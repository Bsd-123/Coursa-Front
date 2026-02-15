import { createContext, useState, type ReactNode } from "react";
import type { user } from "../types/user.types";

type AuthStateType = {
    user: user | null,
}

type AuthContextType = AuthStateType & {
    setUser: (user: user) => void
    isAuthonticated: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

type Props = {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [authState, setAuthState] = useState<AuthStateType>({ user: null })

    const setUser = (user: user) => {
        setAuthState({ ...authState, user })
    }
    return <AuthContext.Provider value={{ ...authState, setUser, isAuthonticated: !!authState.user }}>
        {children}
    </AuthContext.Provider>
}