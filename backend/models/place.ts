import { categories } from "@/utils/categories";
import { Document, Schema, Types, model, models } from "mongoose";

export interface ILocation {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface IImage {
  public_id: string;
  url: string;
}

export interface IReview {
  user: Types.ObjectId;
  rating: number;
  comment: string;
}

export interface IPlace extends Document {
  name: string;
  description: string;
  pageLink: string;
  address: string;
  location: ILocation;
  rating: number;
  isFavorite: boolean;
  numOfReviews: number;
  images: IImage[];
  category: string;
  reviews: IReview[];
  user: Types.ObjectId;
  createdAt: Date;
}

const placeSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter place name"],
    trim: true,
    maxLength: [200, "Place name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter place description"],
  },
  pageLink: {
    type: String,
    required: [false, "Please enter place url link"],
  },
  address: {
    type: String,
    required: [false, "Please enter place address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    zipCode: String,
    country: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter place category"],
    enum: {
      values: categories,
      message: "Please select correct category for place",
    },
  },
  reviews: [
    {
      user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Place || model<IPlace>("Place", placeSchema);
