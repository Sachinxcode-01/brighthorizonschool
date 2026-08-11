import React from 'react';
import { BarChart3, Download, FileText } from 'lucide-react';

export default function ReportsAdmin() {
  const reports = [
    { title: 'Academic Year 2026-27 Admission Summary', category: 'Admissions Report', date: 'August 2026' },
    { title: 'Monthly Fee Collection & Pending Dues Audit', category: 'Finance Report', date: 'August 2026' },
    { title: 'Student & Teacher Monthly Attendance Analytics', category: 'Attendance Report', date: 'July 2026' },
    { title: 'CBSE Grade 10 Board Result & Marks Breakdown', category: 'Academic Report', date: 'June 2026' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Administrative Reports & Exports</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Generate and export PDF/CSV reports for admissions, finances, attendance, and academics.</p>
      </div>

      <div className="grid-admin-2">
        {reports.map((rep, idx) => (
          <div key={idx} className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="badge-status badge-active" style={{ marginBottom: '8px' }}>{rep.category}</span>
              <h3 style={{ fontSize: '1.1rem', color: 'white', marginTop: '4px' }}>{rep.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Generated: {rep.date}</p>
            </div>
            <button onClick={() => alert(`Exporting ${rep.title}`)} className="btn-admin btn-admin-primary">
              <Download size={16} /> Export PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
