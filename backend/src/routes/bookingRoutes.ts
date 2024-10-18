import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import {
  createBookingController,
  deleteBookingController,
  getAllBookingsController,
  getBookingByIdController,
  getBookingsByUserController,
  updateBookingController,
} from "../controllers/BookingController";

const router = Router();

router.get(
  "/bookings",
  authMiddleware,
  roleMiddleware("admin"),
  getAllBookingsController
);

router.get("/bookings/user", authMiddleware, getBookingsByUserController);

router.get("/bookings/:id", authMiddleware, getBookingByIdController);

router.post(
  "/bookings",
  authMiddleware,
  roleMiddleware("user"),
  createBookingController
);

router.put("/bookings/:id", authMiddleware, updateBookingController);

router.delete("/bookings/:id", authMiddleware, deleteBookingController);

export default router;
