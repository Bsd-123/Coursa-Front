import { useEffect } from "react"
import { getSession } from "./auth.utils"
import { loginByToken } from "../services/auth.service"
import { useAuthContext } from "./useAuthContext"

const InitializeAuth = () => {
    const { setUser } = useAuthContext()

    useEffect(() => {
        const initialize = async () => {
            const token = getSession()
            if (token) {
                const user = await loginByToken(token);
                setUser(user)
            }
        }
        initialize()
    }, [])


    return null
}

export default InitializeAuth