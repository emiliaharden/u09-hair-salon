import { Request, Response } from "express";
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
} from "../services/BookingService";

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
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBookingByIdController = async (req: Request, res: Response) => {
  try {
    const booking = await getBookingById(req.params.id);
    res.status(200).json(booking);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const updatedBooking = await updateBooking(req.params.id, req.body);
    res.status(200).json(updatedBooking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBookingController = async (req: Request, res: Response) => {
  try {
    await deleteBooking(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
