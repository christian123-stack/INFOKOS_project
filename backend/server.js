// server.js (ES module)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Kos from "./models/Kos.js";
import commentRoute from "./routes/commentRoute.js";


const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// ---- REGISTER ----
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email sudah terdaftar!" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ message: "Registrasi berhasil!" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Error server" });
  }
});

// ---- LOGIN ----
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ id: user._id, email: user.email }, "RAHASIA_SUPER_AMAN", { expiresIn: "1d" });

    res.json({
      message: "Login berhasil",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Error server" });
  }
});

// ---- UPLOAD KOS ----
app.post("/api/kos", async (req, res) => {
  try {
    const { name, price, description, address, image, userId } = req.body;

    const newKos = new Kos({
      name,
      price,
      description,
      address,
      image,
      createdBy: userId,
      comments: []
    });

    await newKos.save();
    res.json({ message: "Kos berhasil disimpan!", kos: newKos });
  } catch (err) {
    console.error("UPLOAD KOS ERROR:", err);
    res.status(500).json({ message: "Gagal upload kos" });
  }
});

// ---- GET ALL KOS ----
app.get("/api/kos", async (req, res) => {
  try {
    const data = await Kos.find().populate("createdBy", "name email");
    res.json(data);
  } catch (err) {
    console.error("GET ALL KOS ERROR:", err);
    res.status(500).json({ message: "Gagal mengambil data kos" });
  }
});

// ---- GET KOS BY ID (PENTING untuk fetch komentar di frontend) ----
app.use("/api/comments", commentRoute);

// DELETE KOS
// DELETE KOS
app.delete("/api/kos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;  // ← FIX DI SINI

    const kos = await Kos.findById(id);
    if (!kos) {
      return res.status(404).json({ message: "Kos tidak ditemukan" });
    }

    const isOwner = kos.createdBy.toString() === userId;
    const isAdmin = userId === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Tidak punya akses!" });
    }

    await Kos.findByIdAndDelete(id);

    res.json({ message: "Kos berhasil dihapus!" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Gagal menghapus kos" });
  }
});


// ---- DB CONNECT ----
mongoose
  .connect("mongodb+srv://admin:paswword@cluster0.gjtorfo.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB CONNECT ERROR:", err));

app.listen(5000, () => console.log("Server berjalan di port 5000"));
