import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";
import { IService } from "./ServiceModel";

export interface IBooking extends Document {
  user: IUser | mongoose.Types.ObjectId;
  service: IService[] | mongoose.Types.ObjectId[];
  employee: mongoose.Types.ObjectId;
  date: Date;
  slot: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: string;
  notes?: string;
}

const BookingSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  ],
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, default: "pending" },
  notes: { type: String },
});

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
