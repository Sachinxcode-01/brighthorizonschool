import React from 'react';
import { ContactForm, OfficeDetails } from '@/features/contact';

export default function ContactPage() {
  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Get In Touch</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>Contact & Campus Location</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Reach out via email, telephone, or visit our main school office.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          {/* Contact Form Feature */}
          <ContactForm />

          {/* Office Details & Map Feature */}
          <OfficeDetails />
        </div>
      </div>
    </div>
  );
}
