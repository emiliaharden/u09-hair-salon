import { CalendarItemProps, Schedule } from '@/interfaces/Schedule';

const CalendarItem: React.FC<CalendarItemProps> = ({ day, schedules }: CalendarItemProps) => {
  // Jämför schemadatum med det valda datumet (dag) utan att ta hänsyn till tid
  const daySchedules = (Array.isArray(schedules) ? schedules : []).filter((schedule: Schedule) => {
    const scheduleDate = new Date(schedule.date).toDateString(); // Nollställ tid för schemadatum
    const currentDate = new Date(day).toDateString(); // Nollställ tid för den aktuella dagen
    return scheduleDate === currentDate; 
  });

  return (
    <div className="p-4">
      <div>{new Date(day).toLocaleString('sv-SE')}</div> {/* Datum för dagen */}

      {daySchedules.length > 0 ? (
        daySchedules.map((schedule: Schedule, index) => (
          <div key={index}>
            {schedule.slots.length > 0 ? (
              schedule.slots.reduce((acc: JSX.Element[], slot, slotIndex, slots) => {
                if (!slot.isBooked) {
                  // Om slotten är ledig, lägg till den direkt
                  acc.push(
                    <div
                      key={slotIndex}
                      className="border p-2 bg-green-200 text-center rounded-lg"
                    >
                      <div>
                        {new Date(slot.startTime).toLocaleTimeString('sv-SE', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                          timeZone: 'Europe/Stockholm',
                        })} -{' '}
                        {new Date(slot.endTime).toLocaleTimeString('sv-SE', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                          timeZone: 'Europe/Stockholm',
                        })}
                      </div>
                      <div>Available</div>
                    </div>
                  );
                } else {
                  // Hantera bokade slots
                  if (
                    slotIndex === 0 ||
                    new Date(slots[slotIndex - 1].endTime).getTime() !==
                      new Date(slot.startTime).getTime() ||
                    !slots[slotIndex - 1].isBooked
                  ) {
                    // Börja en ny block för sammanhängande bokade slots
                    const mergedSlotStart = new Date(slot.startTime);
                    let mergedSlotEnd = new Date(slot.endTime);
                    let i = slotIndex;

                    // Sammanfoga slots tills de inte längre är sammanhängande eller lediga
                    while (
                      i + 1 < slots.length &&
                      slots[i + 1].isBooked &&
                      new Date(slots[i + 1].startTime).getTime() === mergedSlotEnd.getTime()
                    ) {
                      mergedSlotEnd = new Date(slots[i + 1].endTime);
                      i++;
                    }

                    const mergedSlotsCount = i - slotIndex + 1; // Hur många slots som ska visas i längd

                    acc.push(
                      <div
                        key={slotIndex}
                        className="border p-2 bg-red-500 text-center rounded-lg"
                        style={{ gridRowEnd: `span ${mergedSlotsCount}` }} // Behåll längden på slotsen
                      >
                        <div>
                          {mergedSlotStart.toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            timeZone: 'Europe/Stockholm',
                          })} -{' '}
                          {mergedSlotEnd.toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            timeZone: 'Europe/Stockholm',
                          })}
                        </div>
                        <div>
                          <p><strong>Kund:</strong> {slot.booking?.user?.name || 'Okänd kund'}</p>
                          <p><strong>Tjänst(er):</strong> {slot.booking?.service?.map((s) => s.name).join(', ') || 'Okänd tjänst'}</p>
                        </div>
                      </div>
                    );

                    // Hoppa över sammanfogade slots i nästa iteration
                    slotIndex = i;
                  }
                }

                return acc;
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
  );
};

export default CalendarItem;
