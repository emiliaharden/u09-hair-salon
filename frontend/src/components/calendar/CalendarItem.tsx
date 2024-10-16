import React from 'react'
import { CalendarItemProps, Schedule } from '@/interfaces/Schedule'

const CalendarItem: React.FC<CalendarItemProps> = ({ day, schedules }) => {
    // Jämför schemadatum med det valda datumet (dag) utan att ta hänsyn till tid
    const daySchedules = schedules.filter((schedule: Schedule) => {
        const scheduleDate = new Date(schedule.date).setHours(0, 0, 0, 0) // Nollställ tid för schemadatum
        const currentDate = new Date(day).setHours(0, 0, 0, 0) // Nollställ tid för den aktuella dagen
        return scheduleDate === currentDate // Jämför datum utan tid
    })

    return (
        <div className="p-4">
            <div>{new Date(day).toLocaleDateString('sv-SE')}</div> {/* Datum för dagen */}

            {/* Om det finns ett schema för dagen */}
            {daySchedules.length > 0 ? (
                daySchedules.map((schedule: Schedule, index) => (
                    <div key={index}>
                        {/* Loopa genom alla slots i schemat */}
                        {schedule.slots.length > 0 ? (
                            schedule.slots.map((slot, slotIndex) => {
                                const startTimeFormatted = new Date(slot.startTime).toLocaleTimeString('sv-SE', {
                                    
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    timeZone: 'Europe/Stockholm'
                                })
                                const endTimeFormatted = new Date(slot.endTime).toLocaleTimeString('sv-SE', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    timeZone: 'Europe/Stockholm'
                                })

                                return (
                                    <div
                                        key={slotIndex}
                                        className={`border p-2 ${slot.isBooked ? 'bg-red-500' : 'bg-green-200'} text-center rounded-lg`}
                                    >
                                        <div>
                                            {startTimeFormatted} - {endTimeFormatted}
                                        </div>
                                        <div>{slot.isBooked ? '(Booked)' : 'Available'}</div>
                                    </div>
                                )
                            })
                        ) : (
                            <div>No available slots</div>
                        )}
                    </div>
                ))
            ) : (
                <div>No available slots</div>
            )}
        </div>
    )
}

export default CalendarItem
