import { Service } from '../store/useServiceStore'
export interface Booking {
    _id: string
    service: Service[]
    date: string
    status: string
    notes?: string

    employee: {
        _id: string
        name: string
        email: string
    }
}
