/* eslint-disable @typescript-eslint/restrict-template-expressions */
import mongoose from "mongoose";

/**
 * @description: Connect to MongoDB
 */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB as string);
    console.log(`MongoDB Connected: ${conn.connections[0].name}`);
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
