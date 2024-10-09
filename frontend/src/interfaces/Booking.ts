export interface Booking {
    _id: string
    service: string[]
    date: string
    status: string
    notes?: string

    employee: {
        _id: string
        name: string
        email: string
    }
}
