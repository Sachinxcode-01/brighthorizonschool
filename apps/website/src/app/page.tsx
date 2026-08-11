'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Bell, Calendar, ChevronRight } from 'lucide-react';
import { publicApi } from '../services/api';
import { SiteContent, Notice, SchoolEvent } from '../types';

export default function Home() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);

  useEffect(() => {
    publicApi.getSiteContent().then(res => res.success && res.data && setContent(res.data));
    publicApi.getNotices().then(res => res.success && res.data && setNotices(res.data.slice(0, 3)));
    publicApi.getEvents().then(res => res.success && res.data && setEvents(res.data.slice(0, 2)));
  }, []);

  return (
    <div>
      {/* Hero Section with Vanta.js Birds backdrop */}
      <section style={{
        position: 'relative',
        padding: '120px 0 90px',
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
            marginBottom: '24px',
            textShadow: '0 0 15px #ff4df0'
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
            <Link href="/admissions" className="btn-glow">
              Apply for Admission <ArrowRight size={18} />
            </Link>
            <Link href="/about" style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              fontWeight: 600,
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center'
            }}>
              Explore Our School
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Notices Ticker */}
      {notices.length > 0 && (
        <section style={{ background: 'var(--bg-surface)', padding: '16px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
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

      {/* Principal's Message Preview */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '320px', borderRadius: '14px', overflow: 'hidden' }}>
              <Image
                src={content?.principalImageUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80"}
                alt="Principal"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <div className="badge" style={{ marginBottom: '12px' }}>Message from the Principal</div>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px', textShadow: '0 0 10px #ff4df0' }}>
                {content?.principalName || 'Dr. S. K. Mukherjee'}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '24px' }}>
                "{content?.principalMessage || 'At Bright Horizon School, education goes beyond textbooks. We believe in nurturing curious minds, fostering moral integrity, and empowering every child to excel.'}"
              </p>
              <Link href="/about" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-pink)' }}>
                Read Full Leadership Vision <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section style={{ background: 'var(--bg-surface)', padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ color: '#ff4df0', fontSize: '2.5rem', fontWeight: 800, textShadow: '0 0 10px #ff4df0' }}>2,200+</div>
            <div style={{ color: 'var(--text-muted)' }}>Students Enrolled</div>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', fontWeight: 800, textShadow: '0 0 10px #06b6d4' }}>95+</div>
            <div style={{ color: 'var(--text-muted)' }}>Expert Faculty</div>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-purple)', fontSize: '2.5rem', fontWeight: 800, textShadow: '0 0 10px #c91cff' }}>100%</div>
            <div style={{ color: 'var(--text-muted)' }}>CBSE Board Success</div>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ color: '#3b82f6', fontSize: '2.5rem', fontWeight: 800, textShadow: '0 0 10px #3b82f6' }}>28+</div>
            <div style={{ color: 'var(--text-muted)' }}>Years of Excellence</div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="badge" style={{ marginBottom: '12px' }}>Campus Life</div>
            <h2 style={{ fontSize: '2.2rem', textShadow: '0 0 10px #ff4df0' }}>Upcoming Events</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {events.map(ev => (
              <div key={ev.id} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={ev.imageUrl || "https://images.unsplash.com/photo-1564069114553-74154c41864e?w=800&q=80"} alt={ev.title} fill style={{ objectFit: 'cover' }} />
                </div>
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
            <Link href="/events" className="btn-glow">View All Events</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
