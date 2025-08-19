import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI as string);
  } catch (error) {
    console.log(error);
    throw new Error("Db connection failed");
  }
}

export default connectDb;
