import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  const ADMIN_LOGIN_URL = 'http://localhost:3001/login';

  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      paddingTop: '60px',
      paddingBottom: '30px',
      marginTop: '80px'
    }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          {/* Col 1: School Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
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
              Shaping young minds for a brighter future. Empowering student growth through innovative academics, STEM robotics, and moral excellence.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span className="badge">CBSE Affiliated</span>
              <span className="badge" style={{ background: 'var(--gradient-glow)', border: '1px solid var(--border-glow)' }}>Est. 1998</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'white' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/about" style={{ color: 'var(--text-muted)' }}>About Us & History</Link></li>
              <li><Link to="/academics" style={{ color: 'var(--text-muted)' }}>Curriculum & Classes</Link></li>
              <li><Link to="/faculty" style={{ color: 'var(--text-muted)' }}>Faculty Profiles</Link></li>
              <li><Link to="/admissions" style={{ color: 'var(--text-muted)' }}>Admissions & Fees</Link></li>
              <li><Link to="/facilities" style={{ color: 'var(--text-muted)' }}>Campus Facilities</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources & Info */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'white' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/events" style={{ color: 'var(--text-muted)' }}>Events & Notices</Link></li>
              <li><Link to="/gallery" style={{ color: 'var(--text-muted)' }}>Photo & Video Gallery</Link></li>
              <li><Link to="/downloads" style={{ color: 'var(--text-muted)' }}>Circulars & Downloads</Link></li>
              <li><Link to="/calendar" style={{ color: 'var(--text-muted)' }}>Academic Calendar</Link></li>
              <li><Link to="/policies" style={{ color: 'var(--text-muted)' }}>School Policies</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'white' }}>Contact Info</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
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

        {/* Bottom Bar with Discrete Admin Login Link */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-subtle)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Bright Horizon School. All Rights Reserved. Public School Portal.
          </div>

          {/* Discrete Secure Admin Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} style={{ color: 'var(--accent-blue)' }} />
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
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
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
