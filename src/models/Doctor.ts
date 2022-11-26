import mongoose from "mongoose";
const { Schema } = mongoose;

import { IDoctor } from "src/interfaces/interfaceModels";
import Review from "./Review";

const doctorSchema = new Schema<IDoctor>(
  {
    doctorName: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    contact: [
      {
        phone: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        facebook: {
          type: String,
          required: false,
          unique: true,
        },
        instagram: {
          type: String,
          required: false,
          unique: true,
        },
      },
    ],
    reviews: [
      {
        type: [Review.schema],
      },
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);
export default Doctor;
