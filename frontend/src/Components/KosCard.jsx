export default function KosCard({ kos, currentUser, onDetailClick, onDelete }) {
  const user = currentUser || null;

  // Admin selalu boleh hapus
  const isAdmin = user?.email === "admin@gmail.com";

  // createdBy bisa berupa string atau object
  const ownerId =
    typeof kos.createdBy === "object"
      ? kos.createdBy?._id
      : kos.createdBy; // jika string

  const isOwner = user?.id === ownerId;

  return (
    <div className="card" data-aos="zoom-in">
      <img src={kos.image} alt={kos.name} />

      <div className="card-content">
        <h3>{kos.name}</h3>
        <p>Rp {Number(kos.price).toLocaleString()} / bulan</p>

        <button className="btn-detailKos" onClick={() => onDetailClick(kos)}>
          Lihat Detail
        </button>

        {(isOwner || isAdmin) && (
          <button
            className="btn-delete-kos"
            onClick={() => onDelete(kos._id)}
            style={{
              background: "red",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              marginTop: "0px",
              cursor: "pointer",
              marginLeft:"12px",
              height:"32px"
            }}
          >
            Hapus
          </button>
        )}
      </div>
    </div>
  );
}
