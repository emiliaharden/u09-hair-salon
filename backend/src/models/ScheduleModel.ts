import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "./BookingModel";

export interface ISlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
  booking?: IBooking | mongoose.Types.ObjectId; // Kan vara ett bokningsobjekt eller en ObjectId
  _id?: mongoose.Types.ObjectId;
}

export interface ISchedule extends Document {
  admin: mongoose.Types.ObjectId;
  date: Date;
  slots: ISlot[];
}

// mongoose schema för slot
// mongoose schema för slot
const SlotSchema = new Schema<ISlot>({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  booking: { type: Schema.Types.ObjectId, ref: "Booking", required: false }, // Koppling till bokning
});

// Mongoose Schema för schedule
const ScheduleSchema = new Schema<ISchedule>({
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  slots: [SlotSchema], //För att skapa slots
});

export const Schedule = mongoose.model<ISchedule>("Schedule", ScheduleSchema);
