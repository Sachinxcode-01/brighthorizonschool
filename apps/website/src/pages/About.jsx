import React, { useEffect, useState } from 'react';
import { ShieldCheck, Target, Eye, Award, History, Users } from 'lucide-react';
import { publicApi } from '../services/api';

export default function About() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    publicApi.getSiteContent().then(res => res.success && setContent(res.data));
  }, []);

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>About Our School</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Legacy of Excellence & Vision</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Nurturing intellect, character, and leadership since 1998.
          </p>
        </div>

        {/* History */}
        <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <History size={28} style={{ color: 'var(--accent-cyan)' }} />
            <h2 style={{ fontSize: '1.8rem' }}>Our History</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8 }}>
            {content?.schoolHistory || 'Established in 1998, Bright Horizon School began with a vision to provide world-class education with affordable accessibility. Over 28 years, our campus has expanded to accommodate modern science labs, smart classrooms, sports complexes, and a vibrant community of over 2,000 learners.'}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid-2" style={{ marginBottom: '40px' }}>
          <div className="glass-card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Eye size={26} style={{ color: 'var(--accent-blue)' }} />
              <h2 style={{ fontSize: '1.5rem' }}>Our Vision</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
              {content?.vision || 'To be a premier educational institution inspiring global leadership, environmental stewardship, and lifelong passion for learning.'}
            </p>
          </div>

          <div className="glass-card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Target size={26} style={{ color: 'var(--accent-purple)' }} />
              <h2 style={{ fontSize: '1.5rem' }}>Our Mission</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
              {content?.mission || 'To deliver holistic, inclusive, and technology-driven education that develops analytical minds, compassionate hearts, and resilient leaders.'}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="glass-card" style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', textAlign: 'center' }}>Core Educational Values</h2>
          <div className="grid-3">
            {(content?.coreValues || ['Academic Excellence', 'Integrity & Respect', 'Innovation & Curiosity', 'Inclusivity & Empathy', 'Environmental Responsibility']).map((val, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <ShieldCheck size={20} style={{ color: 'var(--accent-cyan)' }} />
                <span style={{ fontWeight: 600, fontSize: '1rem' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
