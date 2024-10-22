import { useState } from 'react';
import { API_URL } from '@/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useUserStore } from '@/store/useUserStore';

const CreateScheduleComponent = () => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const { user } = useUserStore(); // Hämtar inloggad admin-användare (för adminId)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!date || !startTime || !endTime || !user) {
            toast.error('All fields are required.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Authorization error.');
            return;
        }

        // Skicka schemat till backend med adminId, starttid, sluttid och datum
        const scheduleData = {
            adminId: user.id, // Använd inloggad admins ID
            startTime,
            endTime,
            date,
        };

        try {
            const response = await fetch(`${API_URL}/schedules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(scheduleData),
            });

            if (!response.ok) {
                throw new Error('Failed to create schedule.');
            }

            const data = await response.json();
            toast.success('Schedule created successfully!');
            console.log('Created schedule:', data);
        } catch (error) {
            console.error('Error creating schedule:', error);
            toast.error('Error creating schedule.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-center">Create Schedule</h2>

            <div className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="date">Date:</label>
                    <Input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="startTime">Start Time:</label>
                    <Input
                        type="time"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        className="border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="endTime">End Time:</label>
                    <Input
                        type="time"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        className="border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <Button variant="default" size="lg" className="w-full bg-black text-white hover:bg-gray-700" type="submit">
                Create Schedule
            </Button>
        </form>
    );
};

export default CreateScheduleComponent;
