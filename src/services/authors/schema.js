import mongoose from "mongoose";
const { model, Schema } = mongoose;
const authorsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  blogposts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }]
});

export default model("Author", authorsSchema);
