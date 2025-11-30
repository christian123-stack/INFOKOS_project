import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <h2>Hubungi Kami</h2>

      <div className="contact-container" data-aos="fade-up" data-aos-delay="100">
        <div className="contact-card">
          <FiPhone className="contact-icon" />
          <h3>Telepon</h3>
          <p>+62 812-3456-7890</p>
        </div>

        <div className="contact-card">
          <FiMail className="contact-icon" />
          <h3>Email</h3>
          <p>support@infokos.com</p>
        </div>

        <div className="contact-card">
          <FiMapPin className="contact-icon" />
          <h3>Alamat</h3>
          <p>Medan, Sumatera Utara</p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
