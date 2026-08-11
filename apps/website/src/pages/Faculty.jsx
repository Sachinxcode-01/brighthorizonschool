import React, { useEffect, useState } from 'react';
import { Search, Mail, Phone, BookOpen, Award } from 'lucide-react';
import { publicApi } from '../services/api';

export default function Faculty() {
  const [teachers, setTeachers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    publicApi.getFaculty().then(res => {
      if (res.success && Array.isArray(res.data)) {
        setTeachers(res.data);
        setFiltered(res.data);
      }
    });
  }, []);

  useEffect(() => {
    let result = teachers;
    if (selectedDept !== 'All') {
      result = result.filter(t => t.department === selectedDept);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, selectedDept, teachers]);

  const departments = ['All', ...new Set(teachers.map(t => t.department).filter(Boolean))];

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Distinguished Educator Profiles</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Our Public Faculty Directory</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Meet our highly qualified, passionate educators dedicated to shaping minds and fostering excellence.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          {/* Department Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`btn ${selectedDept === dept ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 16px', fontSize: '0.85rem' }}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search faculty by name or subject..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '10px 14px 10px 42px',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid-3">
          {filtered.map(t => (
            <div key={t.id} className="glass-card" style={{ padding: '24px', textAlign: 'center', position: 'relative' }}>
              <img
                src={t.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"}
                alt={t.name}
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 16px',
                  border: '3px solid var(--accent-blue)',
                  boxShadow: 'var(--shadow-glow)'
                }}
              />
              <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>{t.department}</span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{t.name}</h3>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '12px' }}>{t.designation}</p>

              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                marginBottom: '14px'
              }}>
                <div><strong>Subject:</strong> {t.subject}</div>
                <div><strong>Qualification:</strong> {t.qualification}</div>
                <div><strong>Experience:</strong> {t.experience}</div>
              </div>

              {t.bio && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', fontStyle: 'italic' }}>
                  "{t.bio}"
                </p>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            No faculty members match your selected search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
