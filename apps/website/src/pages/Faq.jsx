import React, { useEffect, useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { publicApi } from '../services/api';

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    publicApi.getFaqs().then(res => res.success && setFaqs(res.data));
  }, []);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Got Questions?</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px' }}>Frequently Asked Questions</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Find clear answers regarding admissions, campus transport, academics, and school policies.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-card"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
              >
                <div style={{
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={20} style={{ color: 'var(--accent-cyan)' }} />
                    {faq.question}
                  </div>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 20px 56px',
                    color: 'var(--text-muted)',
                    fontSize: '0.98rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '16px'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
