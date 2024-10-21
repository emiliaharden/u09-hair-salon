import { useState, useEffect } from 'react';
import CalendarItem from './CalendarItem';
import { useUserStore } from '@/store/useUserStore';
import { Schedule } from '@/interfaces/Schedule';

const CalendarComponent = () => {
    const user = useUserStore((state) => state.user);
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/schedules/${user?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = await response.json();
                console.log('Fetched schedules:', data);
                setSchedules(data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
    }, [user?.id]);

    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i); // Skapa en vecka framåt
        return date;
    });

    return (
        <div className="border p-4 w-full max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-4">Calendar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                {days.map((day, index) => (
                    <CalendarItem key={index} day={day} schedules={schedules} />
                ))}
            </div>
        </div>
    );
}

export default CalendarComponent;
