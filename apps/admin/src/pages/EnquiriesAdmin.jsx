import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { adminApi } from '../services/api';

export default function EnquiriesAdmin() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    adminApi.resource('enquiries').getAll().then(res => res.success && setEnquiries(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Public Contact Submissions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Messages and inquiries received via the public Contact Us page.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sender Name</th>
              <th>Contact Email / Phone</th>
              <th>Subject</th>
              <th>Message Content</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(e => (
              <tr key={e.id}>
                <td style={{ fontWeight: 600 }}>{e.name}</td>
                <td>{e.email} • {e.phone}</td>
                <td style={{ color: 'var(--admin-primary)', fontWeight: 600 }}>{e.subject}</td>
                <td>{e.message}</td>
                <td>{new Date(e.submittedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
