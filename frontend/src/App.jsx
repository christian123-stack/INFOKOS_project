import React, { useState, useEffect } from "react";
import "./App.css";
import DetailModal from "./Components/DetailModal.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Header from "./Components/Header.jsx";
import Hero from "./Components/Hero.jsx";
import KosList from "./Components/KosList.jsx";
import UploadSection from "./Components/UploadSection.jsx";
import Footer from "./Components/Footer.jsx";
import LoginModal from "./Components/LoginModal.jsx";
import RegisterModal from "./Components/RegisterModal.jsx";
import ContactSection from "./Components/ContactSection.jsx";
import TestimonialSection from "./Components/TestimoniSection.jsx";

function App() {
  const [selectedKos, setSelectedKos] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [kosList, setKosList] = useState([]);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 🔥 LOAD USER DARI LOCAL STORAGE SAAT REFRESH
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser)); // ← INI YANG BIKIN ADMIN TIDAK HILANG
    }
  }, []);

  // GET KOS
  useEffect(() => {
    fetch("http://localhost:5000/api/kos")
      .then((res) => res.json())
      .then((data) => setKosList(data));
  }, []);

  // UPLOAD KOS
  const handleUploadKos = (kos) => {
    setKosList((prev) => [...prev, kos]);
  };

  // DELETE KOS
  const handleDelete = async (kosId) => {
    const confirmDelete = confirm("Yakin mau menghapus kos ini?");
    if (!confirmDelete) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Anda harus login dulu!");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/kos/${kosId}?userId=${user.id}`,
      {
        method: "DELETE"
      }
    );

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setKosList((prev) => prev.filter((item) => item._id !== kosId));
    }
  };

  // AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const filteredKos = kosList.filter((kos) =>
    kos.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Header onLoginClick={() => setShowLogin(true)} currentUser={currentUser} />

      <Hero />

      <KosList
        kosList={filteredKos}
        onDetailClick={(kos) => setSelectedKos(kos)}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        currentUser={currentUser} // ← Supaya KosCard bisa cek admin/owner
        onDelete={handleDelete}
      />

      <UploadSection onUpload={handleUploadKos} currentUser={currentUser} />

      <TestimonialSection />
      <ContactSection />
      <Footer />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(user) => {
            localStorage.setItem("user", JSON.stringify(user)); // ← Simpan user
            setCurrentUser(user);
          }}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal onClose={() => setShowRegister(false)} />
      )}

      {selectedKos && (
        <DetailModal
          kos={selectedKos}
          onClose={() => setSelectedKos(null)}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default App;
