'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactSchema, ContactFormData } from '../schemas/contact.schema';
import { contactService } from '../services/contact.service';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setStatus(null);

    const res = await contactService.submitContact(data);
    setLoading(false);

    if (res.success) {
      setStatus({ type: 'success', msg: res.message || 'Contact message submitted successfully!' });
      reset();
    } else {
      setStatus({ type: 'error', msg: res.message || 'Failed to send message.' });
    }
  };

  return (
    <div className="glass-card" style={{ padding: '36px' }}>
      <h2 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Send Us a Message</h2>

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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Your Name *</label>
            <input {...register('name')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
            {errors.name && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.name.message}</span>}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email Address *</label>
            <input type="email" {...register('email')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.email.message}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Phone Number</label>
            <input {...register('phone')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Subject *</label>
            <input {...register('subject')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }} />
            {errors.subject && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.subject.message}</span>}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Message *</label>
          <textarea rows={4} {...register('message')} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.06)', color: 'white' }}></textarea>
          {errors.message && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.message.message}</span>}
        </div>

        <button type="submit" disabled={loading} className="btn-glow" style={{ justifyContent: 'center' }}>
          {loading ? 'Sending...' : 'Send Message'} <Send size={16} />
        </button>
      </form>
    </div>
  );
}
