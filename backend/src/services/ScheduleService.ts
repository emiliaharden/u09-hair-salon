import { ISlot, Schedule } from "../models/ScheduleModel";
import User from "../models/UserModel";

export const createSchedule = async (
  adminId: string,
  slots: ISlot[],
  date: Date
) => {
  try {
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.roles?.includes("admin")) {
      throw new Error("Admin user not found or user is not an admin");
    }

    const newSchedule = new Schedule({
      admin: adminId,
      date,
      slots,
    });

    const savedSchedule = await newSchedule.save();
    console.log("Schedule created successfully", savedSchedule);
    return savedSchedule;
  } catch (error: any) {
    console.error("Error while saving schedule:", error);
    throw new Error(error.message || "Error creating schedule");
  }
};

export const getAllSchedules = async () => {
  try {
    const schedules = await Schedule.find().populate("admin", "name");
    return schedules;
  } catch (error: any) {
    console.error("Error fetching schedules:", error);
    throw new Error(error.message);
  }
};

export const getScheduleByAdminAndDate = async (
  adminId: string,
  date: Date
) => {
  try {
    const schedule = await Schedule.findOne({ admin: adminId, date }).populate(
      "admin",
      "name"
    );
    if (!schedule) {
      throw new Error("No schedule found for this admin and date");
    }
    return schedule;
  } catch (error: any) {
    console.error("Error fetching schedule:", error);
    throw new Error(error.message);
  }
};

export const updateSchedule = async (scheduleId: string, slots: ISlot[]) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { slots },
      { new: true }
    ).populate("admin", "name");

    if (!updatedSchedule) {
      throw new Error("Schedule not found");
    }
    return updatedSchedule;
  } catch (error: any) {
    console.error("Error updating schedule:", error);
    throw new Error(error.message);
  }
};

export const deleteSchedule = async (scheduleId: string) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);
    if (!deleteSchedule) {
      throw new Error("Schedule not found");
    }
    return deletedSchedule;
  } catch (error: any) {
    console.error("Error deleting schedule:", error);
    throw new Error(error.message);
  }
};

export const getAvailableSlots = async (adminId: string, date: Date) => {
  try {
    const schedule = await Schedule.findOne({ admin: adminId, date }).populate(
      "admin",
      "name"
    );
    if (!schedule) {
      throw new Error("No schedule found for this admin and date");
    }

    const availableSlots = schedule.slots.filter((slot) => !slot.isBooked);
    return availableSlots;
  } catch (error: any) {
    console.error("Error fetching avaiable slots:", error);
    throw new Error(error.message);
  }
};
