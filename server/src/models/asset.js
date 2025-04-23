import mongoose, { Schema } from "mongoose";

const asset__schema = new Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    file_type: {
      type: String,
      required: true,
    },
    file_size: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Asset = mongoose.model("Image", asset__schema);

export default Asset;
