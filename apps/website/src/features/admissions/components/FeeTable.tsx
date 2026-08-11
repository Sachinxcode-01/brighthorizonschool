import React from 'react';
import { DollarSign } from 'lucide-react';

export default function FeeTable() {
  const feeStructure = [
    { grade: 'Grade 1 - 5 (Primary)', tuition: '₹28,000 / Term', admissionFee: '₹10,000', development: '₹4,000' },
    { grade: 'Grade 6 - 8 (Middle)', tuition: '₹32,000 / Term', admissionFee: '₹10,000', development: '₹4,500' },
    { grade: 'Grade 9 - 10 (Secondary)', tuition: '₹35,000 / Term', admissionFee: '₹12,000', development: '₹5,000' },
    { grade: 'Grade 11 - 12 (Senior High)', tuition: '₹40,000 / Term', admissionFee: '₹15,000', development: '₹6,000' }
  ];

  return (
    <div className="glass-card" style={{ padding: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <DollarSign size={24} style={{ color: '#4ade80' }} /> Academic Fee Structure (2026-2027)
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--accent-pink)' }}>
              <th style={{ padding: '12px' }}>Grade / Level</th>
              <th style={{ padding: '12px' }}>Tuition Fee</th>
              <th style={{ padding: '12px' }}>Admission Fee (One-time)</th>
              <th style={{ padding: '12px' }}>Development Fee</th>
            </tr>
          </thead>
          <tbody>
            {feeStructure.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '14px', fontWeight: 600 }}>{row.grade}</td>
                <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{row.tuition}</td>
                <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{row.admissionFee}</td>
                <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{row.development}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
