import React, { useEffect, useState } from 'react';
import { FileSpreadsheet, Plus } from 'lucide-react';
import { adminApi } from '../services/api';

export default function ExaminationsModule() {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    adminApi.resource('examinations').getAll().then(res => res.success && setExams(res.data));
    adminApi.resource('results').getAll().then(res => res.success && setResults(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Examinations & Marks Entry</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Schedule term exams, record student marks, calculate grades, and generate report cards.</p>
      </div>

      <div className="admin-card">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'white' }}>Scheduled Examinations</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Exam Title</th>
              <th>Term</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Max Marks</th>
            </tr>
          </thead>
          <tbody>
            {exams.map(e => (
              <tr key={e.id}>
                <td style={{ fontWeight: 600 }}>{e.title}</td>
                <td>{e.term}</td>
                <td>{e.className}</td>
                <td>{e.subject}</td>
                <td>{e.date}</td>
                <td>{e.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
