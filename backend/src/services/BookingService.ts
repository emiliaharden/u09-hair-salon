import { Types } from "mongoose";
import { Booking } from "../models/BookingModel";
import { Schedule } from "../models/ScheduleModel";
import { Service } from "../models/ServiceModel";
import User from "../models/UserModel";
import mongoose from "mongoose";
import { toISO, toUTC } from "../utils/timeUtils";

export const createBooking = async (data: any) => {
  const { user, service, employee, date, startTime, notes } = data;

  // Validera att alla valda tjänster är giltiga
  const validServices = await Service.find({ _id: { $in: service } });
  if (validServices.length !== service.length) {
    throw new Error("One or more selected services are invalid");
  }
  console.log(
    "Services selected:",
    validServices.map((s) => s.name + " (" + s.duration + " mins)")
  );

  // Beräkna den totala varaktigheten för alla valda tjänster
  const totalDuration = validServices.reduce(
    (total, service) => total + service.duration,
    0
  );
  console.log("Total Duration (mins):", totalDuration);

  try {
    const employeeUser = await User.findById(employee);
    if (!employeeUser) {
      throw new Error("Employee not found");
    }

    const roles = employeeUser.roles || [];
    if (!roles.includes("admin")) {
      throw new Error("Selected employee is not an admin");
    }

    // Konvertera start- och sluttid till Date-objekt
    const bookingStartTime = toUTC(startTime); // Använd startTime direkt
    const bookingEndTime = new Date(
      bookingStartTime.getTime() + totalDuration * 60000
    );

    // Logga start- och sluttid för bokningen
    console.log("Booking Start Time:", bookingStartTime);
    console.log("Booking End Time (Calculated):", bookingEndTime);

    // Hämta schemat för den anställda baserat på datumet
    const schedule = await Schedule.findOne({
      admin: employee,
      date: toUTC(date),
    });

    if (!schedule) {
      throw new Error(
        "No schedule found for this employee on the selected date"
      );
    }

    // Logga slots från schemat för att se tillgängliga tider
    console.log(
      "Slots in schedule:",
      schedule.slots.map((slot) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
      }))
    );

    // // Hitta en ledig slot där bokningens start- och sluttid matchar slotens tider
    // const availableSlots = schedule.slots.filter((slot) => {
    //   const slotStartTime = new Date(slot.startTime).getTime();
    //   const slotEndTime = new Date(slot.endTime).getTime();

    //   // Kontrollera om bokningens tid ligger inom slotens tider och att sloten inte är bokad
    //   return (
    //     bookingStartTime.getTime() >= slotStartTime &&
    //     bookingEndTime.getTime() <= slotEndTime &&
    //     !slot.isBooked
    //   );
    // });

    const availableSlots = schedule.slots.filter((slot) => {
      const slotStartTime = new Date(slot.startTime).getTime();
      const slotEndTime = new Date(slot.endTime).getTime();

      // Justera tidsjämförelsen för att kontrollera om slot ligger inom bokningens tid.
      return (
        bookingStartTime.getTime() <= slotEndTime && // Slot måste sluta efter bokningens start
        bookingEndTime.getTime() >= slotStartTime && // Slot måste börja innan bokningens slut
        !slot.isBooked
      );
    });
    // Logga de slots som är tillgängliga efter filtrering
    console.log(
      "Available Slots after filtering:",
      availableSlots.map((slot) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: slot.isBooked,
      }))
    );

    const requiredSlots = Math.ceil(totalDuration / 30);
    let consecutiveSlots = 0;
    let slotStartIndex = -1;
    console.log("Required Slots:", requiredSlots);

    // Gå igenom de tillgängliga slots och kontrollera att de är sammanhängande
    for (let i = 0; i < availableSlots.length; i++) {
      const currentSlotStart = new Date(availableSlots[i].startTime).getTime();
      const previousSlotEnd =
        i > 0 ? new Date(availableSlots[i - 1].endTime).getTime() : null;

      if (previousSlotEnd && currentSlotStart !== previousSlotEnd) {
        console.log(`Slot ${i} och ${i - 1} är inte sammanhängande`);
        // Slotsen är inte sammanhängande
        consecutiveSlots = 0;
        slotStartIndex = -1;
      } else {
        consecutiveSlots++;
        if (slotStartIndex === -1) slotStartIndex = i;
        if (consecutiveSlots >= requiredSlots) break;
      }
    }

    console.log("Found consecutive slots:", consecutiveSlots);

    if (consecutiveSlots < requiredSlots) {
      throw new Error(
        "Not enough continuous available slots for the selected time and duration"
      );
    }

    // Skapa en ny bokning
    const newBooking = new Booking({
      user,
      service,
      employee,
      date: new Date(date),
      startTime: bookingStartTime,
      endTime: bookingEndTime,
      slot: availableSlots[0]._id,
      notes,
    });

    const savedBooking = await newBooking.save();

    // Markera alla berörda slots som bokade och associera dem med bokningen
    availableSlots.slice(0, requiredSlots).forEach((slot) => {
      slot.isBooked = true; // Markera slotten som bokad
      slot.booking = savedBooking._id as mongoose.Types.ObjectId; // Koppla bokningen till slotten
    });

    // Spara schemat efter att slots har uppdaterats
    await schedule.save();

    console.log("Required slots for booking:", requiredSlots);

    return savedBooking;
  } catch (error: any) {
    console.error("Error creating booking:", error.message);
    throw new Error(error.message || "Error creating booking");
  }
};

//hitta bokning

export const getAllBookings = async () => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("employee", "name email")
      .populate("service");
    return bookings;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getBookingsByUser = async (userId: string) => {
  try {
    const bookings = await Booking.find({ user: userId })
      .populate("service", "name duration price")
      .populate("employee", "name email");

    // Om inga bokningar hittas, returnera en tom lista
    if (!bookings.length) {
      return []; // Returnera en tom array istället för att kasta ett fel
    }

    return bookings;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//hitta en specifik bokning

export const getBookingById = async (id: string) => {
  try {
    const booking = await Booking.findById(id)
      .populate("user", "name email")
      .populate("employee", "name email");
    if (!booking) {
      throw new Error("Booking not found");
    }
    return {
      ...booking.toObject(),
      startTime: toISO(booking.startTime),
      endTime: toISO(booking.endTime),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//uppdatera bokning

export const updateBooking = async (id: string, data: any) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updateBooking) {
      throw new Error("Booking not found");
    }
    return updatedBooking;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteBooking = async (id: string) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      throw new Error("Booking not found");
    }

    console.log("Booking deleted:", deletedBooking); // Logga den raderade bokningen

    const updatedSchedule = await Schedule.findOneAndUpdate(
      { "slots.booking": deletedBooking._id },
      {
        $set: {
          "slots.$[slot].isBooked": false,
          "slots.$[slot].booking": undefined,
        },
      },
      {
        arrayFilters: [{ "slot.booking": deletedBooking._id }],
        new: true,
      }
    );

    if (!updatedSchedule) {
      throw new Error("Schedule not found or no matching slots to update");
    }

    console.log("Schedule updated:", updatedSchedule); // Logga det uppdaterade schemat

    return deletedBooking;
  } catch (error: any) {
    console.error("Error deleting booking and updating schedule:", error);
    throw new Error(error.message);
  }
};
