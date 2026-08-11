import React from 'react';
import { Search, Bell, LogOut, UserCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { admin, logout } = useAuth();

  return (
    <header style={{
      height: '70px',
      background: 'var(--admin-surface)',
      borderBottom: '1px solid var(--border-admin)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Global Admin Search */}
      <div style={{ position: 'relative', width: '320px' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search students, staff, records..."
          style={{
            width: '100%',
            padding: '8px 12px 8px 38px',
            borderRadius: '8px',
            border: '1px solid var(--border-admin)',
            background: 'var(--admin-bg)',
            color: 'white',
            fontSize: '0.88rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Admin Profile & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Notifications */}
        <button style={{
          background: 'var(--admin-surface-light)',
          border: 'none',
          borderRadius: '8px',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          position: 'relative'
        }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ef4444'
          }} />
        </button>

        {/* Admin Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border-admin)', paddingLeft: '20px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.9rem'
          }}>
            {admin?.name ? admin.name.charAt(0) : 'A'}
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'white', lineHeight: 1.2 }}>
              {admin?.name || 'Administrator'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {admin?.role || 'Super Admin'}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="btn-admin btn-admin-danger"
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          title="Sign out of Admin Portal"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </header>
  );
}
