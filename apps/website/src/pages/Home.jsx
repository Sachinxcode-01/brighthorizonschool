import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Award, Users, Shield, Calendar, Bell, ChevronRight } from 'lucide-react';
import { publicApi } from '../services/api';

export default function Home({ onOpenAi }) {
  const [content, setContent] = useState(null);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    publicApi.getSiteContent().then(res => res.success && setContent(res.data));
    publicApi.getNotices().then(res => res.success && setNotices(res.data.slice(0, 3)));
    publicApi.getEvents().then(res => res.success && setEvents(res.data.slice(0, 2)));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '100px 0 80px',
        background: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="badge" style={{ marginBottom: '20px' }}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} /> Admissions Open for 2026-2027
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '24px'
          }}>
            {content?.heroTitle || 'Welcome to Bright Horizon School'}
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            maxWidth: '780px',
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}>
            {content?.heroSubtitle || 'Shaping Young Minds for a Brighter Future. Excellence in Education, Innovation, and Growth.'}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/admissions" className="btn btn-primary">
              Apply for Admission <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Explore Our School
            </Link>
          </div>
        </div>
      </section>

      {/* Notice Ticker / Quick Announcements */}
      {notices.length > 0 && (
        <section style={{ background: 'var(--bg-surface)', padding: '16px 0', borderY: '1px solid var(--border-color)' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden' }}>
            <div className="badge" style={{ background: '#ef4444', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bell size={14} /> Latest Notices
            </div>
            <div style={{ display: 'flex', gap: '24px', flex: 1, overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {notices.map(n => (
                <span key={n.id} style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
                  <strong>[{n.category}]</strong> {n.title}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Principal's Message Banner */}
      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ padding: '40px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', alignItems: 'center' }}>
            <img
              src={content?.principalImageUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80"}
              alt="Principal"
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />
            <div>
              <div className="badge" style={{ marginBottom: '12px' }}>Message from the Principal</div>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>{content?.principalName || 'Dr. S. K. Mukherjee'}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                "{content?.principalMessage || 'At Bright Horizon School, education goes beyond textbooks. We believe in nurturing curious minds, fostering moral integrity, and empowering every child to excel.'}"
              </p>
              <Link to="/about" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Read Full Leadership Vision <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Stats Counter */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container grid-4">
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-blue)', fontSize: '2.5rem', fontWeight: 800 }}>2,200+</div>
            <div style={{ color: 'var(--text-muted)' }}>Students Enrolled</div>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', fontWeight: 800 }}>95+</div>
            <div style={{ color: 'var(--text-muted)' }}>Expert Faculty</div>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-purple)', fontSize: '2.5rem', fontWeight: 800 }}>100%</div>
            <div style={{ color: 'var(--text-muted)' }}>CBSE Board Success</div>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-pink)', fontSize: '2.5rem', fontWeight: 800 }}>28+</div>
            <div style={{ color: 'var(--text-muted)' }}>Years of Excellence</div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="badge" style={{ marginBottom: '12px' }}>Campus Life</div>
            <h2 style={{ fontSize: '2.2rem' }}>Upcoming Events</h2>
          </div>

          <div className="grid-2">
            {events.map(ev => (
              <div key={ev.id} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={ev.imageUrl} alt={ev.title} style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '6px' }}>{ev.category}</span>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{ev.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '10px' }}>{ev.description}</p>
                  <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} /> {ev.date} • {ev.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/events" className="btn btn-secondary">View All School Events</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
