import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import {
  createBookingController,
  deleteBookingController,
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
} from "../controllers/BookingController";

const router = Router();

router.put("/bookings/:id", authMiddleware, updateBookingController);

router.get(
  "/bookings",
  authMiddleware,
  roleMiddleware("admin"),
  getAllBookingsController
);

router.get("/bookings/:id", authMiddleware, getBookingByIdController);

router.post(
  "/bookings",
  authMiddleware,
  roleMiddleware("user"),
  createBookingController
);

router.delete("/bookings/:id", authMiddleware, deleteBookingController);

export default router;
