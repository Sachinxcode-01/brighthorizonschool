import React, { useEffect, useState } from 'react';
import { Calendar, Bell, Newspaper, MapPin, Clock } from 'lucide-react';
import { publicApi } from '../services/api';

export default function Events() {
  const [activeTab, setActiveTab] = useState('events'); // events | notices | news
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    publicApi.getEvents().then(res => res.success && setEvents(res.data));
    publicApi.getNotices().then(res => res.success && setNotices(res.data));
    publicApi.getNews().then(res => res.success && setNews(res.data));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Campus Bulletin</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Events, Notices & News</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Stay updated with official school announcements, upcoming calendar events, and achievement news.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          <button
            onClick={() => setActiveTab('events')}
            className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Calendar size={18} /> Upcoming Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`btn ${activeTab === 'notices' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Bell size={18} /> Official Notices ({notices.length})
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`btn ${activeTab === 'news' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Newspaper size={18} /> School News ({news.length})
          </button>
        </div>

        {/* Tab 1: Events */}
        {activeTab === 'events' && (
          <div className="grid-2">
            {events.map(ev => (
              <div key={ev.id} className="glass-card" style={{ padding: '28px', display: 'flex', gap: '20px' }}>
                <img
                  src={ev.imageUrl || "https://images.unsplash.com/photo-1564069114553-74154c41864e?w=800&q=80"}
                  alt={ev.title}
                  style={{ width: '130px', height: '130px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '6px' }}>{ev.category}</span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{ev.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>{ev.description}</p>
                  <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> Date: {ev.date}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> Time: {ev.time}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> Venue: {ev.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Notices */}
        {activeTab === 'notices' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {notices.map(n => (
              <div key={n.id} className="glass-card" style={{ padding: '24px', borderLeft: n.isImportant ? '4px solid #ef4444' : '4px solid var(--accent-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge" style={{ background: n.isImportant ? '#ef4444' : 'var(--gradient-badge)' }}>
                    {n.category} {n.isImportant && '• URGENT'}
                  </span>
                  <span style={{ color: 'var(--text-subtle)', fontSize: '0.82rem' }}>Published: {n.publishDate}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{n.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{n.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: News */}
        {activeTab === 'news' && (
          <div className="grid-2">
            {news.map(nw => (
              <div key={nw.id} className="glass-card" style={{ padding: '24px' }}>
                <img
                  src={nw.imageUrl}
                  alt={nw.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
                />
                <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>News Article</span>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{nw.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '14px' }}>{nw.content}</p>
                <div style={{ color: 'var(--text-subtle)', fontSize: '0.82rem' }}>By {nw.author} • {nw.publishDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
