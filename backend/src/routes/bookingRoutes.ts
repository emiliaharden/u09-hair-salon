import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { createBookingController } from "../controllers/BookingController";

const router = Router();

router.post(
  "/",
  //   authMiddleware,
  //   roleMiddleware("user"),
  createBookingController
);

export default router;
