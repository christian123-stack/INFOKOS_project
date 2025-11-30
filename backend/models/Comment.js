import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  kosId: { type: String, required: true },   // id kos yang dikomentari
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Comment", CommentSchema);
