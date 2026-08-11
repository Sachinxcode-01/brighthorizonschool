import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { adminApi } from '../services/api';

export default function TimetableModule() {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    adminApi.resource('timetable').getAll().then(res => res.success && setTimetable(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Class Timetable & Room Allocation</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Schedule weekly periods, subject assignments, teacher slots, and room locations.</p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Class</th>
              <th>Period</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Room No</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 600 }}>{t.day}</td>
                <td>{t.className}</td>
                <td>{t.period}</td>
                <td style={{ color: 'var(--admin-primary)', fontWeight: 600 }}>{t.subject}</td>
                <td>{t.teacherName}</td>
                <td>{t.roomNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
