import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { adminApi } from '../services/api';

export default function AuditLogsAdmin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    adminApi.getAuditLogs().then(res => res.success && setLogs(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Admin Security & Audit Trail</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Comprehensive log of admin authentication attempts, content edits, and system events.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Admin Email</th>
              <th>Action Category</th>
              <th>Activity Details</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td style={{ fontWeight: 600 }}>{log.adminEmail}</td>
                <td><span className="badge-status badge-active">{log.action}</span></td>
                <td>{log.details}</td>
                <td>{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
