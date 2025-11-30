import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

// GET komentar berdasarkan kosId
router.get("/:kosId", async (req, res) => {
  try {
    const comments = await Comment.find({ kosId: req.params.kosId });
    res.json(comments);
  } catch (err) {
    console.error("GET COMMENTS ERROR:", err);
    res.status(500).json({ message: "Gagal mengambil komentar" });
  }
});

// POST komentar baru
router.post("/", async (req, res) => {
  try {
    const { kosId, user, text } = req.body;

    const newComment = await Comment.create({
      kosId,
      user,
      text
    });

    res.json(newComment);
  } catch (err) {
    console.error("POST COMMENT ERROR:", err);
    res.status(500).json({ message: "Gagal menyimpan komentar" });
  }
});

export default router;
