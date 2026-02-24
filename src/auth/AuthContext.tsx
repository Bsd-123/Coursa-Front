import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user.types";
import { getSession, setSession } from "./auth.utils";
import { loginByToken } from "../services/auth.service";

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
    useEffect(() => {
        const initialize = async () => {
            const token = getSession()
            try {
                if (token) {
                    const user = await loginByToken(token);
                    setSession(token)
                    setAuthState((prev) => ({ ...prev, isInitialized: true, user }))
                } else {
                    throw Error('Unauthorized')
                }
            } catch (error) {
                setAuthState((prev) => ({ ...prev, isInitialized: true }))
            }
        }
        initialize()
    }, [])
<<<<<<< HEAD
    console.log(!!authState.user)
=======
>>>>>>> 4f2870edf90c89ca3fc26234e2f3f29b1e26c9cf
    return <AuthContext.Provider value={{ ...authState, setUser, isAuthonticated: !!authState.user, isInitialized: true }}>
        {children}
    </AuthContext.Provider>
}