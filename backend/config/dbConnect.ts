import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  let DB_URI: string = "";

  if (process.env.NODE_ENV === "development") {
    DB_URI = process.env.DB_LOCAL_URI!;
  } else {
    DB_URI = process.env.MONGODB_URI!;
  }

  await mongoose.connect(DB_URI);
};

export default dbConnect;
