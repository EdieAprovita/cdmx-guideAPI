import mongoose from "mongoose";
const { Schema } = mongoose;

import { IPost } from "src/interfaces/interfaceModels";

const postSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    likes: [
      {
        username: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        username: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
