import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { publicApi } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await publicApi.submitContact(form);
    setLoading(false);

    if (res.success) {
      setStatus({ type: 'success', msg: res.message });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      setStatus({ type: 'error', msg: res.message || 'Failed to submit contact form.' });
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Get In Touch</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Contact & Campus Location</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            We would love to hear from you. Reach out via email, telephone, or visit our main reception.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '60px' }}>
          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Send Us a Message</h2>

            {status && (
              <div style={{
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '20px',
                background: status.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: `1px solid ${status.type === 'success' ? '#22c55e' : '#ef4444'}`,
                color: status.type === 'success' ? '#4ade80' : '#f87171',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Subject *</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Message *</label>
                <textarea
                  rows="4"
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                {loading ? 'Sending Message...' : 'Send Message'} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Contact Details & Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>School Office Details</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={22} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Main Campus Address:</strong>
                    Knowledge Hub Sector 12, City Centre - 400018
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <Phone size={22} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Front Desk Phone:</strong>
                    +91 98300 00000 / 033-2456-7890
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <Mail size={22} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>General Enquiries Email:</strong>
                    info@brighthorizonschool.edu.in
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <Clock size={22} style={{ color: '#4ade80', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Working Hours:</strong>
                    Monday - Saturday: 8:00 AM - 4:00 PM
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map Container */}
            <div className="glass-card" style={{ padding: '16px', overflow: 'hidden', height: '240px' }}>
              <iframe
                title="School Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.717618211029!2d88.4312!3d22.5801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzedNC40Ik4gODjCsDI1JzUyLjMiRQ!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '10px', filter: 'grayscale(0.6) invert(0.9) opacity(0.85)' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
