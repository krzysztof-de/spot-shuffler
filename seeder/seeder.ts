import Place from "../backend/models/place";
import mongoose from "mongoose";
import { places } from "./data";

const seedPlaces = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/places");

    await Place.deleteMany();
    console.log("Places deleted");

    await Place.insertMany(places);
    console.log("Places added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedPlaces();
