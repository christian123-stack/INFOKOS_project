import React, { useState } from 'react';
import KosCard from './KosCard.jsx';
import DetailModal from './DetailModal.jsx';

function KosList({ kosList, searchTerm, onSearchChange, currentUser, onDelete }) {
  const [selectedKos, setSelectedKos] = useState(null);

  const handleDetailClick = (kos) => {
    setSelectedKos(kos);
  };

  const handleCloseModal = () => {
    setSelectedKos(null);
  };

  return (
    <section className="list-kos" data-aos="fade-up" id="list-kos">
      <h2>Daftar Kos Populer</h2>

      {/* Search bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari nama kos, lokasi, atau harga..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      {/* Kos grid */}
      <div className="grid" data-aos="fade-left">
        {kosList.map((kos) => (
          <KosCard
            key={kos._id}
            kos={kos}
            onDetailClick={handleDetailClick}
            onDelete={onDelete}
            currentUser={currentUser}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedKos && (
        <DetailModal
          kos={selectedKos}
          onClose={handleCloseModal}
          currentUser={currentUser}
        />
      )}
    </section>
  );
}

export default KosList;
