import { Request, Response } from "express";
import User from "../models/UserModel"; // Se till att User-modellen är importerad
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
} from "../services/BookingService";

import { Booking } from "../models/BookingModel";

export const createBookingController = async (req: Request, res: Response) => {
  try {
    console.log("Create booking request received:", req.body);
    const newBooking = await createBooking(req.body);

    return res.status(201).json(newBooking);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllBookingsController = async (req: Request, res: Response) => {
  try {
    let bookings;

    if ((req as any).user.roles.includes("admin")) {
      bookings = await getAllBookings();
    } else {
      const userId = (req as any).user.id;
      bookings = await Booking.find({ user: userId })
        .populate("user", "name email")
        .populate("employee", "name email");
    }

    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBookingsByUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    console.log("Fetching bookings for user ID:", userId);

    const bookings = await getBookingsByUser(userId);

    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingByIdController = async (req: Request, res: Response) => {
  try {
    // Hämta bokningen utan populate
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const userId = (req as any).user.id; // Användarens ID från JWT-token
    console.log("User from token:", userId);
    console.log("Booking owner (user ObjectId):", booking.user); // Logga bokningens ägare (ObjectId)

    // Kontrollera att användarens ID från token matchar bokningens användare
    if (
      !(req as any).user.roles.includes("admin") &&
      booking.user.toString() !== userId
    ) {
      console.log("Access denied: User does not own the booking");
      return res.status(403).json({ message: "Access denied" });
    }

    // Om du behöver mer information om användaren (som namn eller email):
    const bookingOwner = await User.findById(booking.user); // Fråga manuellt efter användaren

    if (!bookingOwner) {
      return res.status(404).json({ message: "Booking owner not found" });
    }

    // Returnera bokning och ägarinformation (om du vill ha den)
    res.status(200).json({
      booking,
      owner: {
        name: bookingOwner.name,
        email: bookingOwner.email,
      },
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const userId = (req as any).user.id;
    console.log("User from token:", userId);
    console.log("Booking owner (user ObjectId:", booking.user);

    if (
      !(req as any).user.roles.includes("admin") &&
      booking.user.toString() !== userId
    ) {
      console.log("Access denied: User does not own the booking");
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBooking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBookingController = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const userId = (req as any).user.id;
    console.log("User from token:", userId);
    console.log("Booking owner (user ObjectId:", booking.user);

    if (
      !(req as any).user.roles.includes("admin") &&
      booking.user.toString() !== userId
    ) {
      console.log("Access denied: User does not own the booking");
      return res.status(403).json({ message: "Access denied" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
