import React from 'react';
import { ShieldCheck, Lock, FileText, UserCheck } from 'lucide-react';

export default function PoliciesPage() {
  const policies = [
    { icon: <ShieldCheck size={24} />, title: 'Child Safety & Protection Policy', content: 'Bright Horizon maintains zero tolerance towards harassment or bullying. Our campus is fully monitored with female attendants on buses, biometric entry points, and certified background-checked staff.' },
    { icon: <Lock size={24} />, title: 'Student Data Privacy Policy', content: 'Personal records, admission details, and academic performance files are strictly protected. We do not sell or share student data with third-party advertising services.' },
    { icon: <FileText size={24} />, title: 'Code of Conduct & Attendance Rules', content: 'Students are expected to maintain at least 85% attendance during the academic term. Punctuality, respectful behavior, and adherence to school uniform guidelines are strictly enforced.' },
    { icon: <UserCheck size={24} />, title: 'Anti-Ragging & Equal Opportunity Standards', content: 'We promote a friendly, inclusive learning community regardless of gender, religion, socio-economic background, or nationality.' }
  ];

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Compliance & Governance</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>School Policies & Code of Conduct</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Ensuring a safe, ethical, transparent, and structured environment for every student.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {policies.map((p, i) => (
            <div key={i} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: 'var(--accent-pink)' }}>
                {p.icon}
                <h3 style={{ fontSize: '1.4rem', color: 'white' }}>{p.title}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
                {p.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
