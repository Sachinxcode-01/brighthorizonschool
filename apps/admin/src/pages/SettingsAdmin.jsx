import React, { useEffect, useState } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';
import { adminApi } from '../services/api';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    schoolName: '',
    logoUrl: '',
    currentAcademicYear: '',
    smtpConfigured: true,
    maintenanceMode: false
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    adminApi.getSettings().then(res => res.success && res.data && setSettings(res.data));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const res = await adminApi.updateSettings(settings);
    setLoading(false);

    if (res.success) setMsg('System settings saved successfully!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>System & Branding Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure school name, academic year, branding logos, and system parameters.</p>
      </div>

      {msg && (
        <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#4ade80', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} /> {msg}
        </div>
      )}

      <form onSubmit={handleSave} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="grid-admin-2">
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>School Name</label>
            <input type="text" value={settings.schoolName} onChange={e => setSettings({ ...settings, schoolName: e.target.value })} className="input-admin" />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Academic Year</label>
            <input type="text" value={settings.currentAcademicYear} onChange={e => setSettings({ ...settings, currentAcademicYear: e.target.value })} className="input-admin" />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>School Logo URL</label>
          <input type="text" value={settings.logoUrl} onChange={e => setSettings({ ...settings, logoUrl: e.target.value })} className="input-admin" />
        </div>

        <button type="submit" disabled={loading} className="btn-admin btn-admin-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
          <Save size={16} /> Save System Settings
        </button>
      </form>
    </div>
  );
}
