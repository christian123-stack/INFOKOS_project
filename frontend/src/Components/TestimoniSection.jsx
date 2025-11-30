// Components/TestimonialSection.jsx
import React from 'react';


function TestimonialSection() {
  return (
    <section className="testimonial-section" data-aos="fade-up">
      <h2 className="testimonial-title">Apa Kata Pengguna?</h2>

      <div className="testimonial-container">

        <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
          <p className="testimonial-text">
            "INFOKOS sangat membantu aku menemukan kos murah dan dekat kampus. UI-nya simpel dan cepat dipakai!"
          </p>
          <div className="testimonial-user">
            <img src="https://i.pravatar.cc/80?img=12" alt="User" />
            <div>
              <h4>Rina</h4>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>

        <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
          <p className="testimonial-text">
            "Nyarinya gampang banget, tinggal filter langsung ketemu. Cocok buat mahasiswa baru."
          </p>
          <div className="testimonial-user">
            <img src="https://i.pravatar.cc/80?img=20" alt="User" />
            <div>
              <h4>Andi</h4>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>

        <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300">
          <p className="testimonial-text">
            "Suka banget sama tampilannya, simpel dan bersih. Dapet kos ideal cuma dalam 5 menit!"
          </p>
          <div className="testimonial-user">
            <img src="https://i.pravatar.cc/80?img=30" alt="User" />
            <div>
              <h4>Dewi</h4>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TestimonialSection;
