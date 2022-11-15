import mongoose from "mongoose";
const { Schema } = mongoose;

import { IBusiness } from "src/interfaces/interfaceModels";

const businessSchema = new Schema<IBusiness>(
    {
        namePlace: {
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
        contact: [
            {
                phone: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                facebook: {
                    type: String,
                    required: false,
                },
                instagram: {
                    type: String,
                    required: false,
                },
            },
        ],
        budget: {
            type: Number,
            required: true,
        },
        typeBusiness: {
            type: String,
            required: true,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
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

const Business = mongoose.model<IBusiness>("Business", businessSchema);
export default Business;