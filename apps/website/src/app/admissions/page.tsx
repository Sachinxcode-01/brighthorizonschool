import React from 'react';
import { AdmissionForm, FeeTable } from '@/features/admissions';

export default function AdmissionsPage() {
  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Admissions 2026-2027</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>Admission Procedure & Enquiry</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Submit an online admission enquiry form below to initiate enrollment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          {/* Form */}
          <AdmissionForm />

          {/* Admission Guidelines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--accent-pink)' }}>Admission Steps</h3>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <li><strong>Step 1:</strong> Submit the online admission enquiry form.</li>
                <li><strong>Step 2:</strong> Interaction & campus tour with admissions team.</li>
                <li><strong>Step 3:</strong> Placement assessment & diagnostic test.</li>
                <li><strong>Step 4:</strong> Document verification and fee payment to confirm seat.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Fee Table Feature */}
        <FeeTable />
      </div>
    </div>
  );
}
