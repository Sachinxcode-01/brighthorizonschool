import React, { useEffect, useState } from 'react';
import { Award, Trophy, Medal, Star } from 'lucide-react';
import { publicApi } from '../services/api';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    publicApi.getAchievements().then(res => res.success && setAchievements(res.data));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Pride of Bright Horizon</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Student & School Achievements</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Celebrating academic toppers, sports champions, national science winners, and school accreditations.
          </p>
        </div>

        <div className="grid-2">
          {achievements.map(ach => (
            <div key={ach.id} className="glass-card" style={{ padding: '32px', display: 'flex', gap: '24px' }}>
              <img
                src={ach.imageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"}
                alt={ach.title}
                style={{ width: '140px', height: '140px', borderRadius: '14px', objectFit: 'cover' }}
              />
              <div>
                <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>
                  {ach.category} Category • {ach.year}
                </span>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{ach.title}</h3>
                <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px' }}>
                  Awarded to: {ach.recipientName}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
