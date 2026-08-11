import React, { useEffect, useState } from 'react';
import { Plus, Bell, Edit2, Trash2 } from 'lucide-react';
import { adminApi } from '../services/api';

export default function NoticesCMS() {
  const [notices, setNotices] = useState([]);

  const loadData = async () => {
    const res = await adminApi.resource('notices').getAll();
    if (res.success) setNotices(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this notice?')) {
      await adminApi.resource('notices').delete(id);
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Notices & Announcements CMS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Post official school circulars and urgent notices to the public website banner.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Publish Date</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(n => (
              <tr key={n.id}>
                <td style={{ fontWeight: 600 }}>{n.title}</td>
                <td><span className="badge-status badge-active">{n.category}</span></td>
                <td>{n.publishDate}</td>
                <td>{n.isImportant ? <span style={{ color: '#ef4444', fontWeight: 700 }}>HIGH URGENT</span> : 'Normal'}</td>
                <td>
                  <button onClick={() => handleDelete(n.id)} className="btn-admin btn-admin-danger" style={{ padding: '4px 8px' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
