import { Booking } from "../models/BookingModel";
import User from "../models/UserModel";

// skapa en ny bokning
export const createBooking = async (data: any) => {
  const { user, service, employee, date, notes } = data;

  console.log("Creating booking with data:", data);
  try {
    const employeeUser = await User.findById(employee);
    if (!employeeUser) {
      throw new Error("Employee not found");
    }

    const roles = employeeUser.roles || [];
    if (!roles.includes("admin")) {
      throw new Error("Selected employee is not an admin");
    }

    //kontrollerar om bokningen krockar med en annan bokning för samma anställd
    const existingBooking = await Booking.findOne({ employee, date });
    if (existingBooking) {
      throw new Error("Employee already has a booking at this time");
    }

    //skapa en ny bokning
    const newBooking = new Booking({
      user,
      service,
      employee,
      date,
      notes,
    });

    const savedBooking = await newBooking.save();
    console.log("Boking saved successfully", savedBooking);
    return savedBooking;
  } catch (error: any) {
    console.error("Error while saving booking:", error);
    throw new Error(error.message || "Error creating booking");
  }
};
