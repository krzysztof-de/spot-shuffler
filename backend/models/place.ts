import { categories } from "@/utils/categories";
import mongoose, { Document, Schema, Types, model, models } from "mongoose";
import { googleGeocode } from "../utils/geoCoder";
import { IUser } from "./user";

export interface ILocation {
  coordinates: number[];
  formattedAddress: string;
}
export interface IPrice {
  reduced: number;
  regular: number;
  notes: string;
}

export interface IImage {
  public_id: string;
  url: string;
}

export interface IReview {
  user: IUser;
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
  user: IUser;
  createdAt: Date;
  price: IPrice;
}

const placeSchema: Schema<IPlace> = new Schema({
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
  price: {
    reduced: {
      type: Number,
      required: [false, "Please enter valid reduced price"],
    },
    regular: {
      type: Number,
      required: [false, "Please enter valid regular price"],
    },
    notes: {
      type: String,
      required: [false, "Please enter additional notes for price"],
    },
  },
  address: {
    type: String,
    required: [false, "Please enter place address"],
  },
  location: {
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
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
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Setting up location
placeSchema.pre("save", async function (next) {
  const { geometry, formatted_address } = await googleGeocode(this.address);

  this.location = {
    coordinates: [geometry.location.lng, geometry.location.lat],
    formattedAddress: formatted_address,
  };
});

export default models.Place || model<IPlace>("Place", placeSchema);
