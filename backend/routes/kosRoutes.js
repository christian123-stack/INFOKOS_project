import Kos from "../models/Kos.js";

// UPLOAD KOS BARU
app.post("/api/kos", async (req, res) => {
  try {
    console.log("DATA MASUK:", req.body); // DEBUG

    const { nama, alamat, harga, deskripsi, gambar, userId } = req.body;

    if (!nama || !alamat || !harga || !deskripsi || !gambar) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const kosBaru = new Kos({
      nama,
      alamat,
      harga,
      deskripsi,
      gambar,
      createdBy: userId
    });

    await kosBaru.save();

    res.json({ message: "Kos berhasil ditambahkan!", kos: kosBaru });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan kos" });
  }
});

// GET SEMUA KOS UNTUK DITAMPILKAN DI WEB
app.get("/api/kos", async (req, res) => {
  try {
    const semuaKos = await Kos.find();
    res.json(semuaKos);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data kos" });
  }
});
// DELETE KOS (Admin bisa hapus semua, user hanya bisa hapus miliknya)
app.delete("/api/kos/:id", async (req, res) => {
  try {
    const kosId = req.params.id;
    const { userId } = req.body;

    // Cek apakah kos tersedia
    const kos = await Kos.findById(kosId);
    if (!kos) {
      return res.status(404).json({ message: "Kos tidak ditemukan" });
    }

    // Jika user bukan admin & bukan pemilik → tolak
    const isAdmin = userId === "admin";                // kalau admin via login
    const isOwner = kos.createdBy?.toString() === userId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Tidak diizinkan menghapus kos ini" });
    }

    // Hapus kos
    await Kos.findByIdAndDelete(kosId);

    res.json({ message: "Kos berhasil dihapus!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus kos" });
  }
});
