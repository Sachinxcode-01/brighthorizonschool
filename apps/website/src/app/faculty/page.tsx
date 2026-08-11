'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { publicApi } from '../../services/api';
import { TeacherProfile } from '../../types';

export default function FacultyPage() {
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [filtered, setFiltered] = useState<TeacherProfile[]>([]);
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

  const departments = ['All', ...Array.from(new Set(teachers.map(t => t.department).filter(Boolean)))];

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Distinguished Educator Profiles</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>Our Public Faculty Directory</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Meet our highly qualified, passionate educators dedicated to shaping minds and fostering excellence.
          </p>
        </div>

        {/* Filter & Search */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className="btn-glow"
                style={{
                  padding: '6px 16px',
                  fontSize: '0.85rem',
                  opacity: selectedDept === dept ? 1 : 0.6
                }}
              >
                {dept}
              </button>
            ))}
          </div>

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
                borderRadius: '9999px',
                padding: '10px 14px 10px 42px',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Faculty Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {filtered.map(t => (
            <div key={t.id} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', border: '3px solid #ff4df0', boxShadow: '0 0 15px #ff4df0' }}>
                <Image
                  src={t.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"}
                  alt={t.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>{t.department}</span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{t.name}</h3>
              <p style={{ color: 'var(--accent-pink)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '12px' }}>{t.designation}</p>

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
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  "{t.bio}"
                </p>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            No faculty profiles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
