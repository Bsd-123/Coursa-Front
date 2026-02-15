import { useContext } from "react"
import { AuthContext } from "./AuthContext.ts"

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    //להוציא מההערה עוד מעט! ולשנות שורה מתחת
    if (!context) {
        throw new Error('useAuthContext must be used inside AuthProvider')
    }

    return context
}