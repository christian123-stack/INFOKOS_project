import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import ProfileMenu from "./ProfileMenu.jsx";

function Header({ onLoginClick }) {
  const [user, setUser] = useState(null);

  // Ambil user dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <header>
      <div className="logo">
        <div className="logo-wrap">
          <img src={Logo} alt="logo" className="logoInfokos" />
          <span className="logoText">NFOKOS</span>
        </div>
      </div>

      <nav>
        <a href="#home">Home</a>
        <a href="#upload">Promosi Kos</a>
        <a href="#contact">Contact</a>

        {/* Jika belum login tampilkan tombol login */}
        {!user ? (
          <a href="#" className="btn-login" onClick={onLoginClick}>Login</a>
        ) : (
          // Jika sudah login tampilkan profile icon
          <ProfileMenu user={user} />
        )}
      </nav>
    </header>
  );
}

export default Header;
