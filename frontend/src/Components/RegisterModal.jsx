import React, { useState } from "react";

function RegisterModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.message);
        return;
      }

      setResponse("Registrasi berhasil! Silakan login.");
    } catch (error) {
      setResponse("Terjadi error pada server.");
      console.error(error);
    }
  };

  return (
    <div className="popup" style={{ display: "flex" }}>
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Daftar Akun Baru</h2>

        <input
          type="text"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Daftar</button>

        {response && <p style={{ marginTop: "10px" }}>{response}</p>}
      </div>
    </div>
  );
}

export default RegisterModal;
