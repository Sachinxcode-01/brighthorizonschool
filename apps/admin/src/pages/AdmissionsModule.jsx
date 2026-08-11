import React, { useEffect, useState } from 'react';
import { FileCheck, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { adminApi } from '../services/api';

export default function AdmissionsModule() {
  const [admissions, setAdmissions] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    const res = await adminApi.resource('admissions').getAll();
    if (res.success) setAdmissions(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await adminApi.resource('admissions').update(id, { status: newStatus });
    loadData();
  };

  const filtered = admissions.filter(a =>
    a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.gradeApplying.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Admission Applications & Review</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Review online enquiries submitted from the public website, verify documents, and approve enrollment.
        </p>
      </div>

      <div className="admin-card">
        <div style={{ marginBottom: '16px', maxWidth: '300px' }}>
          <input type="text" placeholder="Search applicant, email, grade..." value={search} onChange={e => setSearch(e.target.value)} className="input-admin" />
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Grade Applying</th>
              <th>Parent & Contact</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Review Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{a.applicantName}</div>
                  {a.previousSchool && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Prev: {a.previousSchool}</div>}
                </td>
                <td style={{ fontWeight: 600, color: 'var(--admin-primary)' }}>{a.gradeApplying}</td>
                <td>
                  <div>{a.parentName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{a.email} • {a.phone}</div>
                </td>
                <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`badge-status ${a.status === 'Approved' ? 'badge-active' : a.status === 'Rejected' ? 'badge-rejected' : 'badge-pending'}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => handleStatusChange(a.id, 'Approved')} className="btn-admin btn-admin-primary" style={{ padding: '4px 8px', fontSize: '0.78rem' }}>
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button onClick={() => handleStatusChange(a.id, 'Rejected')} className="btn-admin btn-admin-danger" style={{ padding: '4px 8px', fontSize: '0.78rem' }}>
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
