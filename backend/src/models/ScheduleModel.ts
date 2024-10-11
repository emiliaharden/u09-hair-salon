import mongoose, { Schema } from "mongoose";

export interface ISlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
  booking?: mongoose.Types.ObjectId;
}

export interface ISchedule extends Document {
  admin: mongoose.Types.ObjectId;
  date: Date;
  slots: ISlot[];
}

// mongoose schema för slot
const SlotSchema = new Schema<ISlot>({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  booking: { type: Schema.Types.ObjectId, ref: "Booking", required: false },
});

// Mongoose Schema för schedule
const ScheduleSchema = new Schema<ISchedule>({
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  slots: [SlotSchema], //För att skapa slots
});

export const Schedule = mongoose.model<ISchedule>("Schedule", ScheduleSchema);
