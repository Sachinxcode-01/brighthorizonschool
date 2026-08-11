import React from 'react';
import { GraduationCap, CheckCircle } from 'lucide-react';

export default function AcademicsPage() {
  const streams = [
    {
      title: 'Primary School (Grades 1 - 5)',
      description: 'Foundational literacy, numeracy, creative arts, outdoor discovery, and interactive storytelling.',
      features: ['Activity-based learning', 'Phonics & language fluency', 'Basic STEM & environmental awareness']
    },
    {
      title: 'Middle School (Grades 6 - 8)',
      description: 'Strengthening analytical thinking, scientific inquiry, digital literacy, and team collaboration.',
      features: ['Integrated Science & Math labs', 'Introduction to Coding & Robotics', 'Language electives']
    },
    {
      title: 'Secondary & Senior High (Grades 9 - 12)',
      description: 'Specialized CBSE curriculum in Science, Commerce, and Humanities preparing for board exams & competitive entrance tests.',
      features: ['Physics, Chemistry, Biology & Biotech', 'Computer Science, AI & Data Science', 'Competitive exam foundation coaching']
    }
  ];

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Academic Framework</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>Curriculum & Academic Streams</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Empowering students with knowledge, critical thinking, and modern technical skills.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {streams.map((st, i) => (
            <div key={i} className="glass-card" style={{ padding: '32px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 77, 240, 0.15)',
                border: '1px solid var(--border-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-pink)',
                marginBottom: '20px'
              }}>
                <GraduationCap size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{st.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.6 }}>
                {st.description}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {st.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--accent-pink)', flexShrink: 0 }} />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
