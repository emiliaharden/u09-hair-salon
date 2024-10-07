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

//hitta bokning

export const getAllBookings = async () => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("employee", "name email");
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
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      throw new Error("Booking not found");
    }
    return deletedBooking;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
