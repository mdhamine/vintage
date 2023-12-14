import mongoose from "mongoose";

export const connectDB = async () => {
  // console.log("connecting");
  try {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) throw new Error("DB_URL is not defined");

    if (mongoose.connections[0].readyState) {
      // console.log("already connected");
      return true;
    }
    // console.log("opening connection");
    await mongoose.connect(dbUrl);
  } catch (e) {
    // console.error(e);
    return false;
  }
  return true;
};
