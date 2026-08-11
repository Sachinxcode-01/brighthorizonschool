'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { admissionEnquirySchema, AdmissionEnquiryFormData } from '../schemas/admission.schema';
import { admissionsService } from '../services/admissions.service';

export default function AdmissionForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AdmissionEnquiryFormData>({
    resolver: zodResolver(admissionEnquirySchema),
    defaultValues: { gradeApplying: 'Grade 1' }
  });

  const onSubmit = async (data: AdmissionEnquiryFormData) => {
    setLoading(true);
    setStatus(null);

    const res = await admissionsService.submitEnquiry(data);
    setLoading(false);

    if (res.success) {
      setStatus({ type: 'success', msg: res.message || 'Admissions enquiry submitted successfully!' });
      reset();
    } else {
      setStatus({ type: 'error', msg: res.message || 'Submission failed. Please try again.' });
    }
  };

  return (
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
  );
}
