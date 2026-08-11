import React from 'react';
import Image from 'next/image';
import { TeacherProfile } from '../../../types';

interface FacultyCardProps {
  teacher: TeacherProfile;
}

export default function FacultyCard({ teacher }: FacultyCardProps) {
  return (
    <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', border: '3px solid #ff4df0', boxShadow: '0 0 15px #ff4df0' }}>
        <Image
          src={teacher.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"}
          alt={teacher.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>{teacher.department}</span>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{teacher.name}</h3>
      <p style={{ color: 'var(--accent-pink)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '12px' }}>{teacher.designation}</p>

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
        <div><strong>Subject:</strong> {teacher.subject}</div>
        <div><strong>Qualification:</strong> {teacher.qualification}</div>
        <div><strong>Experience:</strong> {teacher.experience}</div>
      </div>

      {teacher.bio && (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          "{teacher.bio}"
        </p>
      )}
    </div>
  );
}
