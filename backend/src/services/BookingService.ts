import { Types } from "mongoose";
import { Booking } from "../models/BookingModel";
import { Schedule } from "../models/ScheduleModel";
import { Service } from "../models/ServiceModel";
import User from "../models/UserModel";
import mongoose from "mongoose";

export const createBooking = async (data: any) => {
  const { user, service, employee, date, startTime, endTime, notes } = data;

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
    const bookingStartTime = new Date(`${date}T${startTime}:00Z`);
    // Beräkna sluttiden baserat på starttiden och den totala varaktigheten
    const bookingEndTime = new Date(
      bookingStartTime.getTime() + totalDuration * 60000
    ); // Multiplicera varaktigheten (i minuter) med 60000 för att få millisekunder

    // Hämta schemat för den anställda baserat på datumet
    const schedule = await Schedule.findOne({
      admin: employee,
      date: new Date(date), // Jämför endast datum
    });

    if (!schedule) {
      throw new Error(
        "No schedule found for this employee on the selected date"
      );
    }

    // Hitta en ledig slot där bokningens start- och sluttid matchar slotens tider
    const availableSlots = schedule.slots.filter((slot) => {
      const slotStartTime = new Date(slot.startTime).getTime();
      const slotEndTime = new Date(slot.endTime).getTime();

      // Kontrollera om bokningens tid ligger inom slotens tider och att sloten inte är bokad
      return (
        bookingStartTime.getTime() >= slotStartTime &&
        bookingEndTime.getTime() <= slotEndTime &&
        !slot.isBooked
      );
    });
    const requiredSlots = Math.ceil(totalDuration / 30);
    let consecutiveSlots = 0;
    let slotStartIndex = -1;
    console.log("Total duration:", totalDuration); // För att se om duration är korrekt
    console.log("Required slots:", requiredSlots); // För att se om antal slots är korrekt

    // Gå igenom de tillgängliga slots och kontrollera att de är sammanhängande
    for (let i = 0; i < availableSlots.length; i++) {
      if (
        i > 0 &&
        new Date(availableSlots[i].startTime).getTime() !==
          new Date(availableSlots[i - 1].endTime).getTime()
      ) {
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
    // availableSlots
    //   .slice(slotStartIndex, slotStartIndex + requiredSlots)
    //   .forEach((slot, index) => {
    //     console.log(
    //       `Slot ${index}: ${slot.startTime} - ${slot.endTime}, Booked: ${slot.isBooked}`
    //     );
    //     slot.isBooked = true;
    //     slot.booking = savedBooking._id as mongoose.Types.ObjectId;
    //   });

    availableSlots.slice(0, requiredSlots).forEach((slot) => {
      slot.isBooked = true; // Markera slotten som bokad
      slot.booking = savedBooking._id as mongoose.Types.ObjectId; // Koppla bokningen till slotten
    });

    // Spara schemat efter att slots har uppdaterats
    await schedule.save();

    console.log(
      "Available slots:",
      availableSlots.map((slot) => slot._id)
    );
    console.log("Required slots for booking:", requiredSlots);

    await schedule.save();

    return savedBooking;
  } catch (error: any) {
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

    if (!bookings.length) {
      throw new Error("No bookings found for this user");
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
    return booking;
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
    // Hitta bokningen som ska tas bort
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      throw new Error("Booking not found");
    }

    // Hitta schemat där bokningens slot är associerad
    const schedule = await Schedule.findOne({
      "slots.booking": deletedBooking._id,
    });
    if (!schedule) {
      throw new Error("No schedule found for this booking");
    }

    // Gå igenom slots och uppdatera den som är kopplad till bokningen
    schedule.slots.forEach((slot) => {
      if (slot.booking && slot.booking.equals(deletedBooking.id)) {
        slot.isBooked = false; // Återställ slotten som ledig
        slot.booking = undefined; // Ta bort boknings-ID
      }
    });

    // Spara schemat med de uppdaterade slots
    await schedule.save();

    return deletedBooking;
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    throw new Error(error.message);
  }
};
