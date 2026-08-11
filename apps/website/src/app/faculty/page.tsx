'use client';

import React, { useEffect, useState } from 'react';
import { FacultyCard, FacultyFilter, facultyService } from '@/features/faculty';
import { TeacherProfile } from '@/types';

export default function FacultyPage() {
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [filtered, setFiltered] = useState<TeacherProfile[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    facultyService.getFaculty().then(res => {
      if (res.success && Array.isArray(res.data)) {
        setTeachers(res.data);
        setFiltered(res.data);
      }
    });
  }, []);

  useEffect(() => {
    let result = teachers;
    if (selectedDept !== 'All') {
      result = result.filter(t => t.department === selectedDept);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, selectedDept, teachers]);

  const departments = ['All', ...Array.from(new Set(teachers.map(t => t.department).filter(Boolean)))];

  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Distinguished Educator Profiles</span>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', textShadow: '0 0 15px #ff4df0' }}>Our Public Faculty Directory</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Meet our highly qualified, passionate educators dedicated to shaping minds and fostering excellence.
          </p>
        </div>

        {/* Filter & Search Feature Component */}
        <FacultyFilter
          departments={departments}
          selectedDept={selectedDept}
          onSelectDept={setSelectedDept}
          search={search}
          onSearchChange={setSearch}
        />

        {/* Faculty Grid Feature Components */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {filtered.map(teacher => (
            <FacultyCard key={teacher.id} teacher={teacher} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            No faculty profiles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
