import React, { useEffect, useState } from 'react';
import { CalendarCheck, UserCheck, Search } from 'lucide-react';
import { adminApi } from '../services/api';

export default function AttendanceModule() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    adminApi.resource('attendance').getAll().then(res => res.success && setAttendance(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Attendance Analytics & Logs</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Daily attendance tracking for students and teaching faculty.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Name</th>
              <th>Class / Section</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(a => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td><span className="badge-status badge-active">{a.type}</span></td>
                <td style={{ fontWeight: 600 }}>{a.targetName}</td>
                <td>{a.className || 'Faculty Staff'}</td>
                <td><span className="badge-status badge-active">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
