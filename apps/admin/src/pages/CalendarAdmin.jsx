import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { adminApi } from '../services/api';

export default function CalendarAdmin() {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    adminApi.resource('calendar').getAll().then(res => res.success && setCalendar(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>School Calendar Admin</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Schedule holidays, term dates, and exam schedules.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>{c.title}</td>
                <td><span className="badge-status badge-active">{c.type}</span></td>
                <td>{c.startDate}</td>
                <td>{c.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
