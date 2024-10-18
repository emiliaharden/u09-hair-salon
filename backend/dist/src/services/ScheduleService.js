"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSlots = exports.deleteSchedule = exports.updateSchedule = exports.getScheduleByAdminAndDate = exports.getAllSchedules = exports.createSchedule = void 0;
const ScheduleModel_1 = require("../models/ScheduleModel");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const createSchedule = async (adminId, slots, date) => {
    try {
        const adminUser = await UserModel_1.default.findById(adminId);
        if (!adminUser || !adminUser.roles?.includes("admin")) {
            throw new Error("Admin user not found or user is not an admin");
        }
        const newSchedule = new ScheduleModel_1.Schedule({
            admin: adminId,
            date,
            slots,
        });
        const savedSchedule = await newSchedule.save();
        console.log("Schedule created successfully", savedSchedule);
        return savedSchedule;
    }
    catch (error) {
        console.error("Error while saving schedule:", error);
        throw new Error(error.message || "Error creating schedule");
    }
};
exports.createSchedule = createSchedule;
const getAllSchedules = async () => {
    try {
        const schedules = await ScheduleModel_1.Schedule.find().populate("admin", "name");
        return schedules;
    }
    catch (error) {
        console.error("Error fetching schedules:", error);
        throw new Error(error.message);
    }
};
exports.getAllSchedules = getAllSchedules;
const getScheduleByAdminAndDate = async (adminId, date) => {
    try {
        const schedule = await ScheduleModel_1.Schedule.findOne({ admin: adminId, date }).populate("admin", "name");
        if (!schedule) {
            throw new Error("No schedule found for this admin and date");
        }
        return schedule;
    }
    catch (error) {
        console.error("Error fetching schedule:", error);
        throw new Error(error.message);
    }
};
exports.getScheduleByAdminAndDate = getScheduleByAdminAndDate;
const updateSchedule = async (scheduleId, slots) => {
    try {
        const updatedSchedule = await ScheduleModel_1.Schedule.findByIdAndUpdate(scheduleId, { slots }, { new: true }).populate("admin", "name");
        if (!updatedSchedule) {
            throw new Error("Schedule not found");
        }
        return updatedSchedule;
    }
    catch (error) {
        console.error("Error updating schedule:", error);
        throw new Error(error.message);
    }
};
exports.updateSchedule = updateSchedule;
const deleteSchedule = async (scheduleId) => {
    try {
        const deletedSchedule = await ScheduleModel_1.Schedule.findByIdAndDelete(scheduleId);
        if (!exports.deleteSchedule) {
            throw new Error("Schedule not found");
        }
        return deletedSchedule;
    }
    catch (error) {
        console.error("Error deleting schedule:", error);
        throw new Error(error.message);
    }
};
exports.deleteSchedule = deleteSchedule;
const getAvailableSlots = async (adminId, date) => {
    try {
        const schedule = await ScheduleModel_1.Schedule.findOne({ admin: adminId, date }).populate("admin", "name");
        if (!schedule) {
            throw new Error("No schedule found for this admin and date");
        }
        const availableSlots = schedule.slots.filter((slot) => !slot.isBooked);
        return availableSlots;
    }
    catch (error) {
        console.error("Error fetching avaiable slots:", error);
        throw new Error(error.message);
    }
};
exports.getAvailableSlots = getAvailableSlots;
