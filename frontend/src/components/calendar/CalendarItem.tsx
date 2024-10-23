import { CalendarItemProps, Schedule } from '@/interfaces/Schedule';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

const CalendarItem: React.FC<CalendarItemProps> = ({ day, schedules }: CalendarItemProps) => {
    const daySchedules = (Array.isArray(schedules) ? schedules : []).filter(
        (schedule: Schedule) => {
            const scheduleDate = new Date(schedule.date).toDateString();
            const currentDate = new Date(day).toDateString();
            return scheduleDate === currentDate;
        }
    );

    return (
        <div className="p-4 border rounded-lg shadow-md flex flex-col w-full max-w-md mx-auto">
            <div className="text-lg font-semibold mb-2 text-center">
                {new Date(day).toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'short' })}
            </div>

            {daySchedules.length > 0 ? (
                daySchedules.map((schedule: Schedule, index) => (
                    <div key={index} className="space-y-2">
                        {schedule.slots.length > 0 ? (
                            schedule.slots.map((slot, slotIndex) => (
                                <Popover key={slotIndex}>
                                    <PopoverTrigger asChild>
                                        <div
                                            className={`cursor-pointer p-2 text-center rounded-lg ${
                                                slot.isBooked ? 'bg-red-500 text-white' : 'bg-green-200'
                                            }`}
                                        >
                                            {new Date(slot.startTime).toLocaleTimeString('sv-SE', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            })}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-72">
                                        {slot.isBooked ? (
                                            <div>
                                                <strong>Customer:</strong> {slot.booking?.user?.name || 'Unknown customer'}
                                                <br />
                                                <strong>Service(s):</strong>{' '}
                                                {slot.booking?.service?.map((s) => s.name).join(', ') || 'Unknown service'}
                                            </div>
                                        ) : (
                                            <div>Available</div>
                                        )}
                                    </PopoverContent>
                                </Popover>
                            ))
                        ) : (
                            <div>No available slots</div>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center">No available slots</div>
            )}
        </div>
    );
};

export default CalendarItem;
