import { IBooking } from "../models/BookingModel";
import { ISlot, Schedule } from "../models/ScheduleModel";
import { IService } from "../models/ServiceModel";
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

    const existingSchedule = await Schedule.findOne({ admin: adminId, date });
    if (existingSchedule) {
      throw new Error(
        "A schedule already exist for this admin on the selected date"
      );
    }

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
      const currentEndTime = new Date(currentStartTime.getTime() + 30 * 60000);
      slots.push({
        startTime: currentStartTime.toISOString(),
        endTime: currentEndTime.toISOString(),
        isBooked: false,
      });
      currentStartTime = currentEndTime;
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

    const schedules = await Schedule.find({
      admin: adminId,
    })
      .populate("admin", "name")
      .populate({
        path: "slots.booking",
        populate: [
          { path: "user", model: "User", select: "name email" },
          { path: "service", model: "Service", select: "name duration" },
        ],
      });

    if (!schedules || schedules.length === 0) {
      console.log("No schedules found for this admin.");
      return []; // Return an empty array if no schedules are found
    }

    const scheduleData = schedules.map((schedule) => ({
      date: schedule.date,
      slots: schedule.slots.map((slot) => {
        if (slot.booking && (slot.booking as IBooking).user) {
          const booking = slot.booking as IBooking;
          return {
            isBooked: slot.isBooked,
            user: booking.user,
            services: booking.service.map((s) => {
              if (typeof s === "object" && "name" in s) {
                return (s as IService).name;
              } else {
                return "Unknown service";
              }
            }),
          };
        } else {
          return {
            isBooked: slot.isBooked,
            user: null,
            services: [],
          };
        }
      }),
    }));

    console.log(scheduleData);

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
