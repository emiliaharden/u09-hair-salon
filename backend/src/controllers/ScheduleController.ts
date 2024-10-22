import { Request, Response } from "express";
import { getSchedulesByAdmin } from "../services/ScheduleService";
import {
  createSchedule,
  getAllSchedules,
  getAvailableSlots,
  updateSchedule,
  deleteSchedule,
} from "../services/ScheduleService";

export const createScheduleController = async (req: Request, res: Response) => {
  try {
    const { adminId, startTime, endTime, date } = req.body;
    const newSchedule = await createSchedule(adminId, startTime, endTime, date);
    res.status(201).json(newSchedule);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSchedulesController = async (
  req: Request,
  res: Response
) => {
  try {
    const schedules = await getAllSchedules();
    res.status(200).json(schedules);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAvailableSlotsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { adminId, date } = req.query;
    const availableSlots = await getAvailableSlots(
      adminId as string,
      new Date(date as string)
    );
    res.status(200).json(availableSlots);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getScheduleByAdminController = async (
  req: Request,
  res: Response
) => {
  try {
    const { adminId } = req.params;

    if (!adminId) {
      return res.status(400).json({ message: "Admin ID is required" });
    }

    const schedules = await getSchedulesByAdmin(adminId as string);

    res.status(200).json(schedules);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateScheduleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { slots } = req.body;

    if (!slots || !Array.isArray(slots)) {
      return res
        .status(400)
        .json({ message: "Slots are required and must be an array." });
    }
    const updatedSchedule = await updateSchedule(id, slots);

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    res.status(200).json(updatedSchedule);
  } catch (error: any) {
    console.error("Error updating schedule:", error.message);
    res.status(500).json({ message: "Failed to update schedule." });
  }
};

export const deleteScheduleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedSchedule = await deleteSchedule(id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found." });
    }
    res.status(200).json({ message: "Schedule deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting schedule:", error.message);
    res.status(500).json({ message: "Failed to delete schedule." });
  }
};
