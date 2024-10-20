import { Service } from '../store/useServiceStore'
import { User } from '../pages/admin/components/adminUsersPage'
export interface Booking {
    _id: string
    user: User
    service: Service[]
    date: string
    startTime: string
    endTime: string
    status: string
    notes?: string

    employee: {
        _id: string
        name: string
        email: string
    }
}
