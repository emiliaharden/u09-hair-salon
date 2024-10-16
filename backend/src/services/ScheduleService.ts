import { ISlot, Schedule } from "../models/ScheduleModel";
import User from "../models/UserModel";

export const createSchedule = async (
  adminId: string,
  startTime: string,
  endTime: string,
  dateInput: Date | string
) => {
  try {
    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.roles?.includes("admin")) {
      throw new Error("Admin user not found or user is not an admin");
    }
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    const slots: ISlot[] = [];
    let currentStartTime = new Date(
      `${date.toISOString().split("T")[0]}T${startTime}:00Z`
    );
    const scheduleEndTime = new Date(
      `${date.toISOString().split("T")[0]}T${endTime}:00Z`
    );

    // Dela upp arbetsdagen i 30-minuters slots
    while (currentStartTime < scheduleEndTime) {
      const currentEndTime = new Date(currentStartTime.getTime() + 30 * 60000); // Lägg till 30 minuter
      slots.push({
        startTime: currentStartTime.toISOString(),
        endTime: currentEndTime.toISOString(),
        isBooked: false, // Alla slots är lediga när de skapas
      });
      currentStartTime = currentEndTime; // Flytta starttiden till nästa slot
    }

    console.log("Generated slots:", slots);
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
