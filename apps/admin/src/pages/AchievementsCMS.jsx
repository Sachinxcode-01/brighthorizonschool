import React, { useEffect, useState } from 'react';
import { Award, Plus } from 'lucide-react';
import { adminApi } from '../services/api';

export default function AchievementsCMS() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    adminApi.resource('achievements').getAll().then(res => res.success && setAchievements(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Achievements CMS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage student, teacher, and school award records displayed on the public website.</p>
      </div>

      <div className="grid-admin-2">
        {achievements.map(ach => (
          <div key={ach.id} className="admin-card">
            <span className="badge-status badge-active" style={{ marginBottom: '8px' }}>{ach.category} Category • {ach.year}</span>
            <h3 style={{ fontSize: '1.2rem', color: 'white', marginTop: '6px' }}>{ach.title}</h3>
            <p style={{ color: 'var(--admin-primary)', fontSize: '0.88rem', fontWeight: 600, margin: '4px 0' }}>Recipient: {ach.recipientName}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{ach.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
