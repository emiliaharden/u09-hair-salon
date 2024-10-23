import { useState, useEffect } from 'react';
import CalendarItem from './CalendarItem';
import { useUserStore } from '@/store/useUserStore';
import { Schedule } from '@/interfaces/Schedule';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { API_URL } from '@/config';
import { Button } from '../ui/button';

const CalendarComponent = () => {
    const user = useUserStore((state) => state.user);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await fetch(`${API_URL}/schedules/${user?.id}`, {
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

    const deleteSchedule = async (scheduleId: string) => {
        try {
            const response = await fetch(`${API_URL}/schedules/${scheduleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete schedule');
            }

            setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule._id !== scheduleId));
            console.log("Schedule deleted successfully");
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    const getDaysOfWeek = () => {
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay() + 1 + currentWeekOffset * 7; // Start on Monday
        const days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today.setDate(firstDayOfWeek + i));
            return date;
        });
        return days;
    };

    const days = getDaysOfWeek();

    return (
        <div className="border p-4 w-full max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-4">Calendar</h3>

            {/* Buttons to navigate between weeks */}
            <div className="flex justify-between mb-4">
                <Button onClick={() => setCurrentWeekOffset((prev) => prev - 1)}>Previous Week</Button>
                <Button onClick={() => setCurrentWeekOffset((prev) => prev + 1)}>Next Week</Button>
            </div>

            {/* Desktop version: Grid layout */}
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                {days.map((day, index) => (
                    <div key={index}>
                        <CalendarItem day={day} schedules={schedules} />
                        {schedules
                            .filter((schedule) => new Date(schedule.date).toDateString() === day.toDateString())
                            .map((schedule) => (
                                <div key={schedule._id} className="mt-2">
                                    <Button variant="destructive" onClick={() => deleteSchedule(schedule._id)}>
                                        Delete Schedule
                                    </Button>
                                </div>
                            ))}
                    </div>
                ))}
            </div>

            {/* Mobile version: Accordion layout */}
            <div className="lg:hidden">
                <Accordion type="single" collapsible>
                    {days.map((day, index) => (
                        <AccordionItem key={index} value={`day-${index}`}>
                            <AccordionTrigger>{day.toLocaleDateString()}</AccordionTrigger>
                            <AccordionContent>
                                <CalendarItem day={day} schedules={schedules} />
                                {schedules
                                    .filter((schedule) => new Date(schedule.date).toDateString() === day.toDateString())
                                    .map((schedule) => (
                                        <div key={schedule._id} className="mt-2">
                                            <Button variant="destructive" onClick={() => deleteSchedule(schedule._id)}>
                                                Delete Schedule
                                            </Button>
                                        </div>
                                    ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default CalendarComponent;
