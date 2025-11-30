// models/Kos.js
import mongoose from "mongoose";

const KosSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    address: String,
    image: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    comments: [
      {
        user: { type: String },
        text: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Kos", KosSchema);
