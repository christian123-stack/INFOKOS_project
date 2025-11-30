import React, { useState, useRef, useEffect } from "react";
import avatarImg from "../assets/image.png"; // ← avatar dari assets

export default function ProfileMenu({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Tutup popup jika klik di luar area
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // hapus data user
    window.location.reload(); // reload supaya kembali ke tombol login
  };

  return (
    <div className="profile-container" ref={menuRef}>
      {/* Foto avatar */}
      <img
        src={avatarImg}
        alt="avatar"
        className="avatar"
        onClick={() => setOpen(!open)}
      />

      {/* Popup */}
      {open && (
        <div className="profile-popup">
          <p><b>Username:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
