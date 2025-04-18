import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

UserSchema.index({ username: 1 });

const User = new mongoose.model("user", UserSchema);

export { User };
