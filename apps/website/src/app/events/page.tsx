'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Bell, Newspaper, MapPin, Clock } from 'lucide-react';
import { publicApi } from '../../services/api';
import { SchoolEvent, Notice, NewsItem } from '../../types';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'notices' | 'news'>('events');
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    publicApi.getEvents().then(res => res.success && res.data && setEvents(res.data));
    publicApi.getNotices().then(res => res.success && res.data && setNotices(res.data));
    publicApi.getNews().then(res => res.success && res.data && setNews(res.data));
  }, []);

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Campus Bulletin</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>Events, Notices & News</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Stay updated with official school announcements, upcoming calendar events, and achievement news.
          </p>
        </div>

        {/* Tab Nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('events')} className="btn-glow" style={{ opacity: activeTab === 'events' ? 1 : 0.6 }}>
            <Calendar size={18} /> Events ({events.length})
          </button>
          <button onClick={() => setActiveTab('notices')} className="btn-glow" style={{ opacity: activeTab === 'notices' ? 1 : 0.6 }}>
            <Bell size={18} /> Notices ({notices.length})
          </button>
          <button onClick={() => setActiveTab('news')} className="btn-glow" style={{ opacity: activeTab === 'news' ? 1 : 0.6 }}>
            <Newspaper size={18} /> News ({news.length})
          </button>
        </div>

        {/* Events */}
        {activeTab === 'events' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {events.map(ev => (
              <div key={ev.id} className="glass-card" style={{ padding: '28px', display: 'flex', gap: '20px' }}>
                <div style={{ position: 'relative', width: '130px', height: '130px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={ev.imageUrl || "https://images.unsplash.com/photo-1564069114553-74154c41864e?w=800&q=80"} alt={ev.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '6px' }}>{ev.category}</span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{ev.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>{ev.description}</p>
                  <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div><Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} /> Date: {ev.date}</div>
                    <div><Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Time: {ev.time}</div>
                    <div><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> Venue: {ev.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notices */}
        {activeTab === 'notices' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notices.map(n => (
              <div key={n.id} className="glass-card" style={{ padding: '24px', borderLeft: n.isImportant ? '4px solid #ef4444' : '4px solid #ff4df0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge" style={{ background: n.isImportant ? '#ef4444' : 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                    {n.category} {n.isImportant && '• URGENT'}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Published: {n.publishDate}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{n.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{n.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* News */}
        {activeTab === 'news' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {news.map(nw => (
              <div key={nw.id} className="glass-card" style={{ padding: '24px' }}>
                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                  <Image src={nw.imageUrl} alt={nw.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>News Article</span>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{nw.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '14px' }}>{nw.content}</p>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>By {nw.author} • {nw.publishDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
