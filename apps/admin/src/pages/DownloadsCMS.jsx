import React, { useEffect, useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import { adminApi } from '../services/api';

export default function DownloadsCMS() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    adminApi.resource('downloads').getAll().then(res => res.success && setDownloads(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Public Downloads & Documents CMS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Upload circulars, syllabus PDFs, admission forms, and policy handbooks for public website visitors.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Category</th>
              <th>File Size</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map(dl => (
              <tr key={dl.id}>
                <td style={{ fontWeight: 600 }}>{dl.title}</td>
                <td><span className="badge-status badge-active">{dl.category}</span></td>
                <td>{dl.fileSize}</td>
                <td>{dl.uploadedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
