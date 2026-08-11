import React from 'react';
import Link from 'next/link';
import { GraduationCap, MapPin, Phone, Mail, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  const ADMIN_LOGIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001/login';

  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      paddingTop: '60px',
      paddingBottom: '30px',
      marginTop: '80px'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          {/* Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ff4df0, #c91cff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <GraduationCap size={22} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>
                Bright Horizon School
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Shaping young minds for a brighter future. Excellence in education, innovation, and character building since 1998.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge">CBSE Affiliated</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'white' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link href="/about" style={{ color: 'var(--text-muted)' }}>About Us</Link></li>
              <li><Link href="/academics" style={{ color: 'var(--text-muted)' }}>Academics & Curriculum</Link></li>
              <li><Link href="/faculty" style={{ color: 'var(--text-muted)' }}>Faculty Directory</Link></li>
              <li><Link href="/admissions" style={{ color: 'var(--text-muted)' }}>Admissions & Fees</Link></li>
              <li><Link href="/facilities" style={{ color: 'var(--text-muted)' }}>Campus Facilities</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'white' }}>Resources & Info</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link href="/events" style={{ color: 'var(--text-muted)' }}>Events & Circulars</Link></li>
              <li><Link href="/gallery" style={{ color: 'var(--text-muted)' }}>Photo Gallery</Link></li>
              <li><Link href="/downloads" style={{ color: 'var(--text-muted)' }}>Forms & Prospectus</Link></li>
              <li><Link href="/calendar" style={{ color: 'var(--text-muted)' }}>School Calendar</Link></li>
              <li><Link href="/policies" style={{ color: 'var(--text-muted)' }}>School Policies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'white' }}>Contact Info</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--accent-pink)', flexShrink: 0 }} />
                <span>Knowledge Hub Sector 12, City Centre - 400018</span>
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <span>+91 98300 00000 / 033-2456-7890</span>
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--accent-purple)', flexShrink: 0 }} />
                <span>info@brighthorizonschool.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom with Discrete Admin Login */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Bright Horizon School. All Rights Reserved. Public School Website.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} style={{ color: 'var(--accent-pink)' }} />
            <a
              href={ADMIN_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              Admin Login <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
