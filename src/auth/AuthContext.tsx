import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user.types";
import { getSession, setSession } from "./auth.utils";
import { loginByToken } from "../services/auth.service";

type AuthStateType = {
    user: User | null,
    isInitialized: boolean
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
    const [authState, setAuthState] = useState<AuthStateType>({ user: null, isInitialized: false })
    const setUser = (user: User) => {
        setAuthState({ ...authState, user })
    }
    useEffect(() => {
        const initialize = async () => {
            const token = getSession()
            try {
                if (token) {
                    const user = await loginByToken(token);
                    setSession(token)
                    setAuthState({ user, isInitialized: true });
                } else {
                    throw Error('Unauthorized')
                }
            } catch (error) {
                setAuthState((prev) => ({ ...prev, isInitialized: true }))
            }
        }
        initialize()
    }, [])
    return <AuthContext.Provider value={{ ...authState, setUser, isAuthonticated: !!authState.user }}>
        {children}
    </AuthContext.Provider>
}