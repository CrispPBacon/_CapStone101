import mongoose from "mongoose";

const UserJoinSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "team",
    },
  },
  { timestamps: true }
);

const UserJoin = new mongoose.model("history", UserJoinSchema);

export { UserJoin };
