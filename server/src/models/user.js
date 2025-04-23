import mongoose from "mongoose";

const user__schema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "default" },
    avatar: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

user__schema.index({ username: 1 });

const User = new mongoose.model("user", user__schema);

export default User;
