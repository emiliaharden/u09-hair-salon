import { Booking } from './Booking'

export interface Slot {
    startTime: string
    endTime: string
    isBooked: boolean
    booking?: Booking
}

export interface Schedule {
    _id: string
    date: string
    slots: Slot[]
    admin: string
}

export interface CalendarItemProps {
    day: Date
    schedules: Schedule[]
}
