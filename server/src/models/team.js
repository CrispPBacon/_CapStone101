import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  role: { type: String, default: "member", required: true },
});

const SubTeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    budget: { type: Number },
    members: [UserSchema],
  },
  { timestamps: true }
);

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    budget: { type: Number, default: 0 },
    members: [UserSchema],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "subteams" }],
  },
  { timestamps: true }
);

const Team = new mongoose.model("team", TeamSchema);
const SubTeam = new mongoose.model("subteam", SubTeamSchema);

export { Team, SubTeam };
