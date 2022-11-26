import mongoose from "mongoose";
const { Schema } = mongoose;

import { IProfessionProfile } from "src/interfaces/interfaceModels";

const professionalProfileSchema = new Schema<IProfessionProfile>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
    },
  ],
  skills: [{ type: String }],
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const professionalProfile = mongoose.model<IProfessionProfile>(
  "ProfessionalProfile",
  professionalProfileSchema
);
export default professionalProfile;
