import React, { useState } from 'react';
import { Send, FileText, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { publicApi } from '../services/api';

export default function Admissions() {
  const [formData, setFormData] = useState({
    applicantName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeApplying: 'Grade 1',
    previousSchool: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await publicApi.submitEnquiry(formData);
    setLoading(false);

    if (res.success) {
      setStatus({ type: 'success', msg: res.message });
      setFormData({
        applicantName: '',
        parentName: '',
        email: '',
        phone: '',
        gradeApplying: 'Grade 1',
        previousSchool: '',
        message: ''
      });
    } else {
      setStatus({ type: 'error', msg: res.message || 'Failed to submit enquiry. Please try again.' });
    }
  };

  const feeStructure = [
    { grade: 'Grade 1 - 5 (Primary)', tuition: '₹28,000 / Term', admissionFee: '₹10,000', development: '₹4,000' },
    { grade: 'Grade 6 - 8 (Middle)', tuition: '₹32,000 / Term', admissionFee: '₹10,000', development: '₹4,500' },
    { grade: 'Grade 9 - 10 (Secondary)', tuition: '₹35,000 / Term', admissionFee: '₹12,000', development: '₹5,000' },
    { grade: 'Grade 11 - 12 (Senior High)', tuition: '₹40,000 / Term', admissionFee: '₹15,000', development: '₹6,000' }
  ];

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Admissions 2026-2027</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Admission Process & Online Enquiry</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            We welcome students from diverse backgrounds. Submit an online enquiry below to initiate the enrollment process.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '60px' }}>
          {/* Form Column */}
          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={22} style={{ color: 'var(--accent-blue)' }} /> Online Admission Enquiry Form
            </h2>

            {status && (
              <div style={{
                padding: '14px',
                borderRadius: '10px',
                marginBottom: '20px',
                background: status.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: `1px solid ${status.type === 'success' ? '#22c55e' : '#ef4444'}`,
                color: status.type === 'success' ? '#4ade80' : '#f87171',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.applicantName}
                    onChange={e => setFormData({ ...formData, applicantName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Grade Applying For *</label>
                  <select
                    value={formData.gradeApplying}
                    onChange={e => setFormData({ ...formData, gradeApplying: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'white' }}
                  >
                    {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Previous School (Optional)</label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={e => setFormData({ ...formData, previousSchool: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Additional Message / Notes</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                {loading ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Admission Info & Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--accent-cyan)' }}>Admission Steps</h3>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <li><strong>Step 1:</strong> Submit the online admission enquiry form or download prospectus.</li>
                <li><strong>Step 2:</strong> Interactions & campus tour scheduled with admissions team.</li>
                <li><strong>Step 3:</strong> Student assessment / diagnostic test for appropriate grade placement.</li>
                <li><strong>Step 4:</strong> Document verification and fee payment to confirm seat allotment.</li>
              </ol>
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--accent-purple)' }}>Required Documents</h3>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <li>Birth Certificate issued by municipal authority.</li>
                <li>Transfer Certificate (TC) from last attended recognized school.</li>
                <li>Previous academic report card / marks statement.</li>
                <li>4 recent passport-size photographs of the student.</li>
                <li>Address proof and Parent ID copies (Aadhar/Passport).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Public Fee Structure Table */}
        <div className="glass-card" style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <DollarSign size={24} style={{ color: '#4ade80' }} /> Academic Fee Structure (2026-2027)
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--accent-cyan)' }}>
                  <th style={{ padding: '12px' }}>Grade / Level</th>
                  <th style={{ padding: '12px' }}>Tuition Fee</th>
                  <th style={{ padding: '12px' }}>One-time Admission Fee</th>
                  <th style={{ padding: '12px' }}>Annual Development Fee</th>
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
      </div>
    </div>
  );
}
