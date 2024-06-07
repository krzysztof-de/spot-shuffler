import { Document, Schema, Types, model, models } from "mongoose";
import { IUser } from "./user";
import { IPlace } from "./place";

export interface IBooking extends Document {
  place: IPlace;
  user: IUser;
  checkInDate: Date;
  checkOutDate: Date;
  amountPaid: number;
  daysOfStay: number;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: Date;
  createdAt: Date;
}

const bookingSchema: Schema<IBooking> = new Schema({
  place: {
    type: Types.ObjectId,
    required: true,
    ref: "Place",
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  daysOfStay: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Booking || model<IBooking>("Booking", bookingSchema);
