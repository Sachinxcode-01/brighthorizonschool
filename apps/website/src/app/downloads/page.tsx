'use client';

import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { publicApi } from '../../services/api';
import { DocumentDownload } from '../../types';

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DocumentDownload[]>([]);

  useEffect(() => {
    publicApi.getDownloads().then(res => res.success && res.data && setDownloads(res.data));
  }, []);

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Public Resources</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>Downloads & Circulars</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Download official school circulars, syllabus PDFs, prospectus forms, and policy handbooks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {downloads.map(dl => (
            <div key={dl.id} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '12px' }}>{dl.category}</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{dl.title}</h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
                  File Size: {dl.fileSize} • Uploaded: {dl.uploadedAt}
                </div>
              </div>

              <a
                href={dl.fileUrl}
                download
                onClick={(e) => { e.preventDefault(); alert(`Downloading ${dl.title} (${dl.fileSize})`); }}
                className="btn-glow"
                style={{ justifyContent: 'center', fontSize: '0.88rem' }}
              >
                <Download size={16} /> Download File
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
