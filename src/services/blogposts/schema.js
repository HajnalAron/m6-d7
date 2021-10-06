import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  user_name: { type: String, required: true }
});

const blogPostSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      type: Object,
      value: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        required: true
      }
    },
    author: {
      type: Object,
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      }
    },
    content: { type: String, required: true },
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
);

export default model("BlogPost", blogPostSchema);
