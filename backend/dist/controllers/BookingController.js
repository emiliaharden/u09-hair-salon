"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingController = exports.updateBookingController = exports.getBookingByIdController = exports.getBookingsByUserController = exports.getAllBookingsController = exports.createBookingController = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel")); // Se till att User-modellen är importerad
const BookingService_1 = require("../services/BookingService");
const BookingModel_1 = require("../models/BookingModel");
const createBookingController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { service, employee, date, notes } = req.body;
        if (!employee) {
            return res.status(400).json({ message: "Employee ID is required" });
        }
        console.log("Create booking request received:", req.body);
        const newBooking = await (0, BookingService_1.createBooking)({
            ...req.body,
            user: userId,
        });
        return res.status(201).json(newBooking);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.createBookingController = createBookingController;
const getAllBookingsController = async (req, res) => {
    try {
        let bookings;
        if (req.user.roles.includes("admin")) {
            bookings = await (0, BookingService_1.getAllBookings)();
        }
        else {
            const userId = req.user.id;
            bookings = await BookingModel_1.Booking.find({ user: userId })
                .populate("user", "name email")
                .populate("employee", "name email");
        }
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getAllBookingsController = getAllBookingsController;
const getBookingsByUserController = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Fetching bookings for user ID:", userId);
        const bookings = await (0, BookingService_1.getBookingsByUser)(userId);
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getBookingsByUserController = getBookingsByUserController;
const getBookingByIdController = async (req, res) => {
    try {
        // Hämta bokningen utan populate
        const booking = await (0, BookingService_1.getBookingById)(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const userId = req.user.id; // Användarens ID från JWT-token
        console.log("User from token:", userId);
        console.log("Booking owner (user ObjectId):", booking.user); // Logga bokningens ägare (ObjectId)
        // Kontrollera att användarens ID från token matchar bokningens användare
        if (!req.user.roles.includes("admin") &&
            booking.user.toString() !== userId) {
            console.log("Access denied: User does not own the booking");
            return res.status(403).json({ message: "Access denied" });
        }
        // Om du behöver mer information om användaren (som namn eller email):
        const bookingOwner = await UserModel_1.default.findById(booking.user); // Fråga manuellt efter användaren
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
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getBookingByIdController = getBookingByIdController;
const updateBookingController = async (req, res) => {
    try {
        const booking = await BookingModel_1.Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const userId = req.user.id;
        console.log("User from token:", userId);
        console.log("Booking owner (user ObjectId:", booking.user);
        if (!req.user.roles.includes("admin") &&
            booking.user.toString() !== userId) {
            console.log("Access denied: User does not own the booking");
            return res.status(403).json({ message: "Access denied" });
        }
        const updatedBooking = await BookingModel_1.Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBooking);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateBookingController = updateBookingController;
const deleteBookingController = async (req, res) => {
    try {
        const booking = await BookingModel_1.Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const userId = req.user.id;
        console.log("User from token:", userId);
        console.log("Booking owner (user ObjectId:", booking.user);
        if (!req.user.roles.includes("admin") &&
            booking.user.toString() !== userId) {
            console.log("Access denied: User does not own the booking");
            return res.status(403).json({ message: "Access denied" });
        }
        await BookingModel_1.Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteBookingController = deleteBookingController;
