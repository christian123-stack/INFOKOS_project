import React, { useState } from "react";

function LoginModal({ onClose, onRegisterClick, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.message);
        return;
      }

      // Simpan ke localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // KIRIM user ke App.jsx !!!
      onLoginSuccess(data.user);

      // Tutup modal
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 400);

    } catch (error) {
      setResponse("Terjadi error pada server.");
      console.error(error);
    }
  };

  return (
    <div className="popup" style={{ display: "flex" }}>
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Login ke INFOKOS</h2>

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

        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Belum punya akun?{" "}
          <a href="#" onClick={onRegisterClick} style={{ color: "#d17a22" }}>
            Daftar
          </a>
        </p>

        {response && <p style={{ marginTop: "10px" }}>{response}</p>}
      </div>
    </div>
  );
}

export default LoginModal;
