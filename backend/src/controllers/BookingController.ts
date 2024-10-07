import { Request, Response } from "express";
import { createBooking } from "../services/BookingService";

export const createBookingController = async (req: Request, res: Response) => {
  try {
    console.log("Create booking request received:", req.body);
    const newBooking = await createBooking(req.body);

    return res.status(201).json(newBooking);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
