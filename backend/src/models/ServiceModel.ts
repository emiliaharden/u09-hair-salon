import mongoose, { Schema } from "mongoose";

export interface IService extends Document {
  name: string;
  duration: number; //in minutes
  price: number;
}

const ServiceSchema = new Schema<IService>({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const Service = mongoose.model<IService>("Service", ServiceSchema);
