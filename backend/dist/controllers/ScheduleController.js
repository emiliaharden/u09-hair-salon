"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScheduleController = exports.updateScheduleController = exports.getAvailableSlotsController = exports.getAllSchedulesController = exports.createScheduleController = void 0;
const ScheduleService_1 = require("../services/ScheduleService");
const createScheduleController = async (req, res) => {
    try {
        const { adminId, slots, date } = req.body;
        const newSchedule = await (0, ScheduleService_1.createSchedule)(adminId, slots, date);
        res.status(201).json(newSchedule);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createScheduleController = createScheduleController;
const getAllSchedulesController = async (req, res) => {
    try {
        const schedules = await (0, ScheduleService_1.getAllSchedules)();
        res.status(200).json(schedules);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllSchedulesController = getAllSchedulesController;
const getAvailableSlotsController = async (req, res) => {
    try {
        const { adminId, date } = req.query;
        const availableSlots = await (0, ScheduleService_1.getAvailableSlots)(adminId, new Date(date));
        res.status(200).json(availableSlots);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAvailableSlotsController = getAvailableSlotsController;
const updateScheduleController = async (req, res) => {
    try {
        const { id } = req.params;
        const { slots } = req.body;
        if (!slots || !Array.isArray(slots)) {
            return res
                .status(400)
                .json({ message: "Slots are required and must be an array." });
        }
        const updatedSchedule = await (0, ScheduleService_1.updateSchedule)(id, slots);
        if (!updatedSchedule) {
            return res.status(404).json({ message: "Schedule not found." });
        }
        res.status(200).json(updatedSchedule);
    }
    catch (error) {
        console.error("Error updating schedule:", error.message);
        res.status(500).json({ message: "Failed to update schedule." });
    }
};
exports.updateScheduleController = updateScheduleController;
const deleteScheduleController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSchedule = await (0, ScheduleService_1.deleteSchedule)(id);
        if (!deletedSchedule) {
            return res.status(404).json({ message: "Schedule not found." });
        }
        res.status(200).json({ message: "Schedule deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting schedule:", error.message);
        res.status(500).json({ message: "Failed to delete schedule." });
    }
};
exports.deleteScheduleController = deleteScheduleController;
