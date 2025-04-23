import mongoose from "mongoose";

// TODO: status : Possible additional property.

const topic__schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

topic__schema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Topic = new mongoose.model("topic", topic__schema);

export default Topic;
