import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    type: { type: String, required: true, enum: ["subteam", "team"] },
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
    details: {
      subject: { type: String, required: true },
      merchant: { type: String, required: true },
      amount: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
      status: {
        type: String,
        default: "pending",
        enum: ["pending", "draft", "accepted"],
      },
      receipt_id: { type: String }, // IMAGE_ID FOR RECEIPT
    },
  },
  { timestamps: true }
);

const Expense = new mongoose.model("expense", ExpenseSchema);
export { Expense };
