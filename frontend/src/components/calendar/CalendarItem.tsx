const CalendarItem = () => {
    const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

    return (
        <div className="flex flex-row justify-between w-full">
            {days.map((day, index) => (
                <div key={index} className="border border-gray-300 p-2 flex-1 text-center rounded-lg mx-1">
                    <div>{day}</div>
                    <div className="mt-2">
                        <div className="border border-black p-2 rounded-md">
                            09:00
                        </div>
                       
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CalendarItem;
