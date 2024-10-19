import { useState, useEffect } from 'react';
import CalendarItem from './CalendarItem';
import { Schedule } from '@/interfaces/Schedule'; // Använd ditt befintliga interface
import { useUserStore } from '@/store/useUserStore';

const CalendarComponent = () => {
    const user = useUserStore((state) => state.user)
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
                })

                // const response = await fetch('http://localhost:3000/api/schedules'); // Backend-anrop
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
        <div className="border p-2 w-full max-w-4xl mx-auto">
            <h3>Kalender</h3>
            <div className="p-4">Datum</div>
            <div className="m-4 p-3 flex flex-row justify-between">
                {days.map((day, index) => (
                    <CalendarItem key={index} day={day} schedules={schedules} />
                ))}
            </div>
        </div>
    );
}

export default CalendarComponent;
