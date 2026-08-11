import React from 'react';
import { FlaskConical, Cpu, Library, Dumbbell, Tv, Bus, Utensils, ShieldCheck } from 'lucide-react';

export default function FacilitiesPage() {
  const items = [
    { icon: <FlaskConical size={28} />, title: 'Advanced Science & Biotech Labs', description: 'Fully equipped Physics, Chemistry, and Biology laboratories complying with national safety standards.' },
    { icon: <Cpu size={28} />, title: 'AI & STEM Robotics Hub', description: 'High-speed computing workstations, 3D printers, IoT kits, and robotics programming stations.' },
    { icon: <Library size={28} />, title: 'Digital & Physical Smart Library', description: 'Over 15,000 physical volumes, research journals, e-readers, and quiet study pods.' },
    { icon: <Dumbbell size={28} />, title: 'Sports Complex & Swimming Pool', description: 'Outdoor track, basketball courts, indoor badminton hall, and heated swimming pool.' },
    { icon: <Tv size={28} />, title: 'Interactive Smart Classrooms', description: 'Audio-visual interactive whiteboards, ergonomic seating, and high-speed fiber internet in all rooms.' },
    { icon: <Bus size={28} />, title: 'GPS-Monitored Fleet Transport', description: 'Safe air-conditioned school buses with live GPS tracking for parents and CCTV surveillance.' },
    { icon: <Utensils size={28} />, title: 'Hygienic Organic Cafeteria', description: 'Nutritious chef-prepared meals, fresh fruit bar, and strict food safety compliance.' },
    { icon: <ShieldCheck size={28} />, title: 'Campus 24/7 Security & First Aid', description: 'CCTV coverage across all corridors, bio-metric access gates, and full-time resident nursing infirmary.' }
  ];

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>World-Class Infrastructure</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>Campus Facilities</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Designed to foster intellectual curiosity, physical fitness, and student safety.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {items.map((fac, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '28px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(255, 77, 240, 0.15)',
                border: '1px solid var(--border-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-pink)',
                marginBottom: '18px'
              }}>
                {fac.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{fac.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {fac.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
