import CalendarItem from './CalendarItem';

const CalendarComponent = () => {

    
    return (
        <div className="border p-2 w-full max-w-4xl mx-auto">
            <h3>Februari</h3>
            <div className="p-4">Datum</div>
            <div className="m-4 p-3">
                <CalendarItem />
            </div>
        </div>
    );
}

export default CalendarComponent;
