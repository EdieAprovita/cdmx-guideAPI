import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const { Schema } = mongoose;



const userSchema = new Schema<IUser>({
  _id: {
    type: String,
  },
});