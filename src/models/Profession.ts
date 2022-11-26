import mongoose from "mongoose";
const { Schema } = mongoose;

import { IProfession } from "src/interfaces/interfaceModels";
import Review from "./Review";

const professionSchema = new Schema<IProfession>(
  {
    professionName: {
      type: String,
      required: true,
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    specialty: {
      type: String,
      required: true,
    },
    contact: [
      {
        phone: {
          type: Number,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        facebook: {
          type: String,
        },
        instagram: {
          type: String,
        },
      },
    ],
    rating: {
      type: Number,
    },
    reviews: [
      {
        type: [Review.schema],
      },
    ],
    numReviews: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Profession = mongoose.model("Profession", professionSchema);
export default Profession;
