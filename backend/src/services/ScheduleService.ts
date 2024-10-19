import { ISlot, Schedule } from "../models/ScheduleModel";
import User from "../models/UserModel";
import { toUTC } from "../utils/timeUtils";

export const createSchedule = async (
  adminId: string,
  startTime: string,
  endTime: string,
  dateInput: Date | string
) => {
  try {
    console.log("Creating schedule for adminId:", adminId);

    const adminUser = await User.findById(adminId);
    if (!adminUser || !adminUser.roles?.includes("admin")) {
      throw new Error("Admin user not found or user is not an admin");
    }

    console.log("Admin user found:", adminUser.name);

    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    console.log("Creating schedule for date:", date);

    const slots: ISlot[] = [];
    let currentStartTime = toUTC(
      `${date.toISOString().split("T")[0]}T${startTime}`
    );
    const scheduleEndTime = toUTC(
      `${date.toISOString().split("T")[0]}T${endTime}`
    );

    console.log(
      "Generating slots from",
      currentStartTime,
      "to",
      scheduleEndTime
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
    console.log("Schedule created successfully:", savedSchedule);
    return savedSchedule;
  } catch (error: any) {
    console.error("Error while saving schedule:", error);
    throw new Error(error.message || "Error creating schedule");
  }
};

export const getAllSchedules = async () => {
  try {
    console.log("Fetching all schedules...");
    const schedules = await Schedule.find().populate("admin", "name");
    console.log("Fetched schedules:", schedules);
    return schedules;
  } catch (error: any) {
    console.error("Error fetching schedules:", error);
    throw new Error(error.message);
  }
};

export const getSchedulesByAdmin = async (adminId: string) => {
  try {
    console.log("Fetching schedules for admin:", adminId);
    // Hämta alla scheman för en specifik admin utan att filtrera på datum
    const schedules = await Schedule.find({
      admin: adminId,
    }).populate("admin", "name");

    if (!schedules || schedules.length === 0) {
      throw new Error("No schedules found for this admin.");
    }

    console.log("Schedules for admin:", schedules);
    return schedules;
  } catch (error: any) {
    console.error("Error fetching schedules for admin:", error);
    throw new Error(error.message);
  }
};

export const updateSchedule = async (scheduleId: string, slots: ISlot[]) => {
  try {
    console.log("Updating schedule with ID:", scheduleId);
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      { slots },
      { new: true }
    ).populate("admin", "name");

    if (!updatedSchedule) {
      throw new Error("Schedule not found");
    }

    console.log("Schedule updated successfully:", updatedSchedule);
    return updatedSchedule;
  } catch (error: any) {
    console.error("Error updating schedule:", error);
    throw new Error(error.message);
  }
};

export const deleteSchedule = async (scheduleId: string) => {
  try {
    console.log("Deleting schedule with ID:", scheduleId);
    const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);
    if (!deleteSchedule) {
      throw new Error("Schedule not found");
    }

    console.log("Schedule deleted successfully:", deletedSchedule);
    return deletedSchedule;
  } catch (error: any) {
    console.error("Error deleting schedule:", error);
    throw new Error(error.message);
  }
};

export const getAvailableSlots = async (adminId: string, date: Date) => {
  try {
    console.log(
      "Fetching available slots for admin:",
      adminId,
      "on date:",
      date
    );
    const schedule = await Schedule.findOne({ admin: adminId, date }).populate(
      "admin",
      "name"
    );
    if (!schedule) {
      throw new Error("No schedule found for this admin and date");
    }

    const availableSlots = schedule.slots.filter((slot) => !slot.isBooked);

    console.log("Available slots for date:", date, availableSlots);

    return availableSlots;
  } catch (error: any) {
    console.error("Error fetching available slots:", error);
    throw new Error(error.message);
  }
};
