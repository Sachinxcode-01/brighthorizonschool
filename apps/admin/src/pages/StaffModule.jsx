import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { adminApi } from '../services/api';

export default function StaffModule() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminApi.resource('staff').getAll().then(res => res.success && setStaff(res.data));
  }, []);

  const filtered = staff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Non-Teaching Staff Records</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Administrative, finance, library, and support personnel.</p>
      </div>

      <div className="admin-card">
        <div style={{ marginBottom: '16px', maxWidth: '300px' }}>
          <input type="text" placeholder="Search staff..." value={search} onChange={e => setSearch(e.target.value)} className="input-admin" />
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600, color: 'var(--admin-primary)' }}>{s.staffId}</td>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td>{s.role}</td>
                <td>{s.department}</td>
                <td>{s.email} • {s.phone}</td>
                <td><span className="badge-status badge-active">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
