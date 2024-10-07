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

router.put(
  "/bookings/:id",
  //   authMiddleware,
  //   roleMiddleware("admin"),
  updateBookingController
);

router.get(
  "/bookings",
  //   authMiddleware,
  //   roleMiddleware("admin"),
  getAllBookingsController
);

router.get(
  "/bookings/:id",
  //   authMiddleware,
  //   roleMiddleware("admin"),
  getBookingByIdController
);

router.post(
  "/bookings",
  //   authMiddleware,
  //   roleMiddleware("user"),
  createBookingController
);

router.delete(
  "/bookings/:id",
  //   authMiddleware,
  //   roleMiddleware("admin"),
  deleteBookingController
);

export default router;
