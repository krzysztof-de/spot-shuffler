import Place from "../backend/models/place";
import mongoose from "mongoose";
import { places } from "./data";

const seedPlaces = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/places");

    await Place.deleteMany();

    await Place.insertMany(places);

    process.exit();
  } catch (error) {
    process.exit();
  }
};

seedPlaces();
