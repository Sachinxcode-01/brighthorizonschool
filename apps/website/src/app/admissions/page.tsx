'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, FileText, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { publicApi } from '../../services/api';

const enquirySchema = z.object({
  applicantName: z.string().min(2, 'Student name must be at least 2 characters'),
  parentName: z.string().min(2, 'Parent name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  gradeApplying: z.string(),
  previousSchool: z.string().optional(),
  message: z.string().optional()
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export default function AdmissionsPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      gradeApplying: 'Grade 1'
    }
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setLoading(true);
    setStatus(null);

    const res = await publicApi.submitEnquiry(data);
    setLoading(false);

    if (res.success) {
      setStatus({ type: 'success', msg: res.message || 'Admissions enquiry submitted successfully!' });
      reset();
    } else {
      setStatus({ type: 'error', msg: res.message || 'Submission failed. Please try again.' });
    }
  };

  const feeStructure = [
    { grade: 'Grade 1 - 5 (Primary)', tuition: '₹28,000 / Term', admissionFee: '₹10,000', development: '₹4,000' },
    { grade: 'Grade 6 - 8 (Middle)', tuition: '₹32,000 / Term', admissionFee: '₹10,000', development: '₹4,500' },
    { grade: 'Grade 9 - 10 (Secondary)', tuition: '₹35,000 / Term', admissionFee: '₹12,000', development: '₹5,000' },
    { grade: 'Grade 11 - 12 (Senior High)', tuition: '₹40,000 / Term', admissionFee: '₹15,000', development: '₹6,000' }
  ];

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
          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={22} style={{ color: 'var(--accent-pink)' }} /> Online Admission Enquiry Form
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

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Student Name *</label>
                <input {...register('applicantName')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
                {errors.applicantName && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.applicantName.message}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Parent / Guardian Name *</label>
                <input {...register('parentName')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
                {errors.parentName && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.parentName.message}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email *</label>
                  <input type="email" {...register('email')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
                  {errors.email && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.email.message}</span>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Phone *</label>
                  <input type="tel" {...register('phone')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
                  {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.phone.message}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Grade Applying For *</label>
                  <select {...register('gradeApplying')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'white' }}>
                    {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Previous School</label>
                  <input {...register('previousSchool')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Message / Requirements</label>
                <textarea rows={3} {...register('message')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn-glow" style={{ justifyContent: 'center', marginTop: '10px' }}>
                {loading ? 'Submitting Enquiry...' : 'Submit Admission Enquiry'} <Send size={16} />
              </button>
            </form>
          </div>

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

        {/* Fee Table */}
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
      </div>
    </div>
  );
}
