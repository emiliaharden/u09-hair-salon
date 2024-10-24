"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const BookingController_1 = require("../controllers/BookingController");
const router = (0, express_1.Router)();
router.get("/bookings", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), BookingController_1.getAllBookingsController);
router.get("/bookings/user", authMiddleware_1.authMiddleware, BookingController_1.getBookingsByUserController);
router.get("/bookings/:id", authMiddleware_1.authMiddleware, BookingController_1.getBookingByIdController);
router.post("/bookings", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("user"), BookingController_1.createBookingController);
router.put("/bookings/:id", authMiddleware_1.authMiddleware, BookingController_1.updateBookingController);
router.delete("/bookings/:id", authMiddleware_1.authMiddleware, BookingController_1.deleteBookingController);
exports.default = router;
