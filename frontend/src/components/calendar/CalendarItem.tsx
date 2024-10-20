import { CalendarItemProps, Schedule } from '@/interfaces/Schedule'

const CalendarItem: React.FC<CalendarItemProps> = ({ day, schedules }: CalendarItemProps) => {
    const daySchedules = (Array.isArray(schedules) ? schedules : []).filter(
        (schedule: Schedule) => {
            const scheduleDate = new Date(schedule.date).toDateString()
            const currentDate = new Date(day).toDateString()
            return scheduleDate === currentDate
        }
    )

    return (
        <div className="p-4">
            <div>{new Date(day).toLocaleString('sv-SE')}</div>

            {daySchedules.length > 0 ? (
                daySchedules.map((schedule: Schedule, index) => (
                    <div key={index}>
                        {schedule.slots.length > 0 ? (
                            schedule.slots.reduce((acc: JSX.Element[], slot, slotIndex, slots) => {
                                if (!slot.isBooked) {
                                    acc.push(
                                        <div
                                            key={slotIndex}
                                            className="border p-2 bg-green-200 text-center rounded-lg"
                                        >
                                            <div>
                                                {new Date(slot.startTime).toLocaleTimeString(
                                                    'sv-SE',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                        timeZone: 'Europe/Stockholm',
                                                    }
                                                )}{' '}
                                                -{' '}
                                                {new Date(slot.endTime).toLocaleTimeString(
                                                    'sv-SE',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                        timeZone: 'Europe/Stockholm',
                                                    }
                                                )}
                                            </div>
                                            <div>Available</div>
                                        </div>
                                    )
                                } else {
                                    if (
                                        slotIndex === 0 ||
                                        new Date(slots[slotIndex - 1].endTime).getTime() !==
                                            new Date(slot.startTime).getTime() ||
                                        !slots[slotIndex - 1].isBooked
                                    ) {
                                        const mergedSlotStart = new Date(slot.startTime)
                                        let mergedSlotEnd = new Date(slot.endTime)
                                        let i = slotIndex

                                        while (
                                            i + 1 < slots.length &&
                                            slots[i + 1].isBooked &&
                                            new Date(slots[i + 1].startTime).getTime() ===
                                                mergedSlotEnd.getTime()
                                        ) {
                                            mergedSlotEnd = new Date(slots[i + 1].endTime)
                                            i++
                                        }

                                        const mergedSlotsCount = i - slotIndex + 1

                                        acc.push(
                                            <div
                                                key={slotIndex}
                                                className="border p-2 bg-red-500 text-center rounded-lg"
                                                style={{ gridRowEnd: `span ${mergedSlotsCount}` }}
                                            >
                                                <div>
                                                    {mergedSlotStart.toLocaleTimeString('sv-SE', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                        timeZone: 'Europe/Stockholm',
                                                    })}{' '}
                                                    -{' '}
                                                    {mergedSlotEnd.toLocaleTimeString('sv-SE', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                        timeZone: 'Europe/Stockholm',
                                                    })}
                                                </div>
                                                <div>
                                                    <p>
                                                        <strong>Kund:</strong>{' '}
                                                        {slot.booking?.user?.name || 'Okänd kund'}
                                                    </p>
                                                    <p>
                                                        <strong>Tjänst(er):</strong>{' '}
                                                        {slot.booking?.service
                                                            ?.map((s) => s.name)
                                                            .join(', ') || 'Okänd tjänst'}
                                                    </p>
                                                </div>
                                            </div>
                                        )

                                        slotIndex = i
                                    }
                                }

                                return acc
                            }, [])
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
