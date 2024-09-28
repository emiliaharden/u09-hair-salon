import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import * as jwt_decode from 'jwt-decode'

declare module 'jwt-decode' {
    export default function <T>(token: string): T
}

interface DecodedToken {
    name: string
    email: string
    roles: string[]
    exp: number
    iat: number
}

interface ProtectedRouteProps {
    children: React.ReactNode
    requiredRole?: string
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const setUser = useUserStore((state) => state.setUser)
    const user = useUserStore((state) => state.user)
    console.log('I protected route', user)

    const token = localStorage.getItem('token')

    console.log(token)

    if (token) {
        try {
            const decodedToken: DecodedToken = jwt_decode.jwtDecode(token)
            console.log(decodedToken)

            const issuedAt = new Date(decodedToken.iat * 1000).toLocaleDateString()
            const expiresAt = new Date(decodedToken.exp * 1000).toLocaleString()

            console.log('Token issued at:', issuedAt)
            console.log('Token issued at:', expiresAt)

            if (decodedToken.exp * 1000 < Date.now()) {
                console.log('Token has expired')
                localStorage.removeItem('token')
                return <Navigate to="/login" />
            }
            // Sätt användardata i Zustand om den inte redan är satt
            if (!user) {
                setUser({
                    name: decodedToken.name,
                    email: decodedToken.email,
                    roles: decodedToken.roles,
                })
            }

            if (requiredRole && !decodedToken.roles.includes(requiredRole)) {
                console.log('User does not have the rrequired role')
                return <Navigate to="/login" />
            }
        } catch (error) {
            console.error('Invalid token:', error)
            localStorage.removeItem('token')
            return <Navigate to="/login" />
        }
    } else {
        // Omdirigera till login om ingen token finns
        return <Navigate to="/login" />
    }

    return <>{children}</>
}

export default ProtectedRoute
