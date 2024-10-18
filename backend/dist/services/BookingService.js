"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.getBookingById = exports.getBookingsByUser = exports.getAllBookings = exports.createBooking = void 0;
const BookingModel_1 = require("../models/BookingModel");
const ServiceModel_1 = require("../models/ServiceModel");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const createBooking = async (data) => {
    const { user, service, employee, date, notes } = data;
    const validServices = await ServiceModel_1.Service.find({ _id: { $in: service } });
    if (validServices.length !== service.length) {
        throw new Error("One or more selected services are invalid");
    }
    try {
        const employeeUser = await UserModel_1.default.findById(employee);
        if (!employeeUser) {
            throw new Error("Employee not found");
        }
        const roles = employeeUser.roles || [];
        if (!roles.includes("admin")) {
            throw new Error("Selected employee is not an admin");
        }
        const existingBooking = await BookingModel_1.Booking.findOne({ employee, date });
        if (existingBooking) {
            throw new Error("Employee already has a booking at this time");
        }
        const newBooking = new BookingModel_1.Booking({
            user,
            service,
            employee,
            date,
            notes,
        });
        const savedBooking = await newBooking.save();
        return savedBooking;
    }
    catch (error) {
        throw new Error(error.message || "Error creating booking");
    }
};
exports.createBooking = createBooking;
//hitta bokning
const getAllBookings = async () => {
    try {
        const bookings = await BookingModel_1.Booking.find()
            .populate("user", "name email")
            .populate("employee", "name email")
            .populate("service");
        return bookings;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getAllBookings = getAllBookings;
const getBookingsByUser = async (userId) => {
    try {
        const bookings = await BookingModel_1.Booking.find({ user: userId })
            .populate("service", "name duration price")
            .populate("employee", "name email");
        if (!bookings.length) {
            throw new Error("No bookings found for this user");
        }
        return bookings;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getBookingsByUser = getBookingsByUser;
//hitta en specifik bokning
const getBookingById = async (id) => {
    try {
        const booking = await BookingModel_1.Booking.findById(id)
            .populate("user", "name email")
            .populate("employee", "name email");
        if (!booking) {
            throw new Error("Booking not found");
        }
        return booking;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.getBookingById = getBookingById;
//uppdatera bokning
const updateBooking = async (id, data) => {
    try {
        const updatedBooking = await BookingModel_1.Booking.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!exports.updateBooking) {
            throw new Error("Booking not found");
        }
        return updatedBooking;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (id) => {
    try {
        const deletedBooking = await BookingModel_1.Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            throw new Error("Booking not found");
        }
        return deletedBooking;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.deleteBooking = deleteBooking;
