// DetailModal.jsx
import React, { useState, useEffect } from "react";
import "./DetailModal.css";

export default function DetailModal({ kos, onClose, currentUser = null }) {

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // KOMENTAR
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState("");

  // --- GET KOMENTAR DARI MONGODB ---
  useEffect(() => {
    if (!kos?._id) return;  // biar nggak error kalau undefined

    fetch(`http://localhost:5000/api/comments/${kos._id}`)
      .then(res => res.json())
      .then(data => setCommentList(data));
  }, [kos._id]);


  // --- LIKE ---
  const handleLike = () => {
    setLiked(!liked);
    setLikes((s) => (liked ? s - 1 : s + 1));
  };


  // --- POST KOMENTAR ---
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.name || "Anonymous";

    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kosId: kos._id,
        user: username,
        text: newComment
      })
    });

    const savedComment = await res.json();

    setCommentList(prev => [...prev, savedComment]);  // update langsung
    setNewComment("");
  };


  return (
    <div className="detailOverlay">
      <div className="detailBox">
        <button className="detailClose" onClick={onClose}>×</button>

        <div className="detailContent">
          <div className="detailLeft">
            <img src={kos.image} alt={kos.name} className="detailImg" />
          </div>

          <div className="detailRight">
            <h2 className="detailTitle">{kos.name}</h2>

            <p className="detailPrice">
              Harga: <span>Rp {Number(kos.price).toLocaleString()}</span> / bulan
            </p>

            <p className="detailAddress">
              Alamat: <span>{kos.address || "Alamat belum tersedia"}</span>
            </p>

            <p className="detailDesc">{kos.description || "Belum ada deskripsi."}</p>

            <div className="socialButtons">
             
              <button className="commentBtn">💬 {commentList.length}</button>
            </div>

            <div className="reviewSection">
              <h3>Review & Komen</h3>

              <div className="commentsList">
                {commentList.map(c => (
                  <div key={c._id} className="comment">
                    <strong>{c.user}:</strong> {c.text}
                  </div>
                ))}
              </div>

              <div className="commentForm">
                <input
                  type="text"
                  placeholder="Tulis komentar..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Kirim</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
