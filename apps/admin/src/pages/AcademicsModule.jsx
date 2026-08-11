import React, { useEffect, useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2 } from 'lucide-react';
import { adminApi } from '../services/api';

export default function AcademicsModule() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    adminApi.resource('academics').getAll().then(res => res.success && setClasses(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Academics & Class Structure</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure academic years, grades, sections, subject mappings, and class teacher assignments.</p>
      </div>

      <div className="grid-admin-2">
        {classes.map(c => (
          <div key={c.id} className="admin-card">
            <h2 style={{ fontSize: '1.4rem', color: 'var(--admin-primary)', marginBottom: '12px' }}>{c.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div><strong>Assigned Sections:</strong> {c.sections?.join(', ')}</div>
              <div><strong>Core Subjects:</strong> {c.subjects?.join(', ')}</div>
              <div><strong>Home Room:</strong> {c.roomNo}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
