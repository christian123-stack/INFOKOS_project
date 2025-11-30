import React, { useState, useEffect } from "react";

export default function UploadSection({ onUpload }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  const [user, setUser] = useState(null);

  // Cek login di awal
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  const handleSubmit = () => {
    if (!user) {
      alert("Anda harus login dulu sebelum upload kos!");
      return;
    }

    if (!name || !price || !description || !address || !image) {
      alert("Harap isi semua kolom!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      const res = await fetch("http://localhost:5000/api/kos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          address,
          image: base64,
          userId: user?.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onUpload(data.kos);
        alert("Kos berhasil diupload!");
      } else {
        alert(data.message);
      }
    };

    reader.readAsDataURL(image);
  };

  return (
    <section className="upload-form" id="upload">
      <h2>Upload Kos Baru</h2>

      {!user && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          Anda harus login dulu untuk mengupload kos.
        </p>
      )}

      <input
        type="text"
        placeholder="Nama Kos"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!user}
      />

      <input
        type="number"
        placeholder="Harga Kos"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={!user}
      />

      <textarea
        placeholder="Deskripsi Kos"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={!user}
      />

      <input
        type="text"
        placeholder="Alamat Kos"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={!user}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        disabled={!user}
      />

      <button onClick={handleSubmit} disabled={!user}>
        {user ? "Upload" : "Login dulu"}
      </button>
    </section>
  );
}
