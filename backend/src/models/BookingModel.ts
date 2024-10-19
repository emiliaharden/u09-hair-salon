import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  service: mongoose.Schema.Types.ObjectId[];
  employee: mongoose.Schema.Types.ObjectId;
  date: Date;
  slot: mongoose.Schema.Types.ObjectId; // Koppling till slot
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
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true }, // Koppla till slot
  startTime: { type: Date, required: true }, // Lägger till starttid
  endTime: { type: Date, required: true }, // Lägger till sluttid
  status: { type: String, default: "pending" },
  notes: { type: String },
});

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
