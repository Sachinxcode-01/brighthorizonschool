import React from 'react';
import { Search } from 'lucide-react';

interface FacultyFilterProps {
  departments: string[];
  selectedDept: string;
  onSelectDept: (dept: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

export default function FacultyFilter({
  departments,
  selectedDept,
  onSelectDept,
  search,
  onSearchChange,
}: FacultyFilterProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap',
      marginBottom: '36px'
    }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => onSelectDept(dept)}
            className="btn-glow"
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              opacity: selectedDept === dept ? 1 : 0.6
            }}
          >
            {dept}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', width: '280px' }}>
        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search faculty by name or subject..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-color)',
            borderRadius: '9999px',
            padding: '10px 14px 10px 42px',
            color: 'white',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
}
