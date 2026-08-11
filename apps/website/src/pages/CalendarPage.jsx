import React, { useEffect, useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { publicApi } from '../services/api';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    publicApi.getCalendar().then(res => res.success && setEvents(res.data));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Academic Year 2026-2027</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>School Calendar & Key Dates</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Schedule of term holidays, mid-term examinations, sports day, and cultural festivals.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {events.map(ev => (
              <div key={ev.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-color)',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    padding: '12px 18px',
                    borderRadius: '10px',
                    background: ev.type === 'Holiday' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                    border: `1px solid ${ev.type === 'Holiday' ? '#ef4444' : '#3b82f6'}`,
                    color: ev.type === 'Holiday' ? '#f87171' : '#60a5fa',
                    textAlign: 'center',
                    fontWeight: 700
                  }}>
                    <Calendar size={20} />
                    <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>{ev.type}</div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{ev.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{ev.description}</p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge" style={{ fontSize: '0.85rem' }}>
                    {ev.startDate} {ev.endDate !== ev.startDate && ` to ${ev.endDate}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
