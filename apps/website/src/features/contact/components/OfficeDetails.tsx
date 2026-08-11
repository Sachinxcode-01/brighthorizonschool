import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function OfficeDetails() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>School Contact Info</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <li style={{ display: 'flex', gap: '12px' }}>
            <MapPin size={22} style={{ color: 'var(--accent-pink)', flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'white', display: 'block' }}>Address:</strong>
              Knowledge Hub Sector 12, City Centre - 400018
            </div>
          </li>
          <li style={{ display: 'flex', gap: '12px' }}>
            <Phone size={22} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'white', display: 'block' }}>Phone:</strong>
              +91 98300 00000 / 033-2456-7890
            </div>
          </li>
          <li style={{ display: 'flex', gap: '12px' }}>
            <Mail size={22} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'white', display: 'block' }}>Email:</strong>
              info@brighthorizonschool.edu.in
            </div>
          </li>
          <li style={{ display: 'flex', gap: '12px' }}>
            <Clock size={22} style={{ color: '#4ade80', flexShrink: 0 }} />
            <div>
              <strong style={{ color: 'white', display: 'block' }}>Office Hours:</strong>
              Monday - Saturday: 8:00 AM - 4:00 PM
            </div>
          </li>
        </ul>
      </div>

      <div className="glass-card" style={{ padding: '16px', overflow: 'hidden', height: '240px' }}>
        <iframe
          title="School Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.717618211029!2d88.4312!3d22.5801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzedNC40Ik4gODjCsDI1JzUyLjMiRQ!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '10px', filter: 'grayscale(0.6) invert(0.9) opacity(0.85)' }}
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
