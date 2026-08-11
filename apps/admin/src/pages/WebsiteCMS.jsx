import React, { useEffect, useState } from 'react';
import { Globe, Save, CheckCircle } from 'lucide-react';
import { adminApi } from '../services/api';

export default function WebsiteCMS() {
  const [cms, setCms] = useState({
    heroTitle: '',
    heroSubtitle: '',
    principalName: '',
    principalMessage: '',
    principalImageUrl: '',
    schoolHistory: '',
    vision: '',
    mission: '',
    contactAddress: '',
    contactPhone: '',
    contactEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    adminApi.getCMS().then(res => res.success && res.data && setCms(res.data));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    const res = await adminApi.updateCMS(cms);
    setLoading(false);

    if (res.success) {
      setMsg('Public website content updated successfully! Public pages will now reflect these changes.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Public Website Page Content CMS</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Edit Principal Message, Vision & Mission, History, and Hero banners. Changes sync live to the public site.
        </p>
      </div>

      {msg && (
        <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#4ade80', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} /> {msg}
        </div>
      )}

      <form onSubmit={handleSave} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--admin-primary)', marginBottom: '14px' }}>Homepage Hero Settings</h2>
          <div className="grid-admin-2">
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hero Main Title</label>
              <input type="text" value={cms.heroTitle} onChange={e => setCms({ ...cms, heroTitle: e.target.value })} className="input-admin" />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hero Subtitle</label>
              <input type="text" value={cms.heroSubtitle} onChange={e => setCms({ ...cms, heroSubtitle: e.target.value })} className="input-admin" />
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--admin-primary)', marginBottom: '14px' }}>Principal's Leadership Message</h2>
          <div className="grid-admin-2" style={{ marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Principal Name</label>
              <input type="text" value={cms.principalName} onChange={e => setCms({ ...cms, principalName: e.target.value })} className="input-admin" />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Principal Image URL</label>
              <input type="text" value={cms.principalImageUrl} onChange={e => setCms({ ...cms, principalImageUrl: e.target.value })} className="input-admin" />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Principal Message Text</label>
            <textarea rows="4" value={cms.principalMessage} onChange={e => setCms({ ...cms, principalMessage: e.target.value })} className="input-admin"></textarea>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--admin-primary)', marginBottom: '14px' }}>School History, Vision & Mission</h2>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>School History Narrative</label>
            <textarea rows="3" value={cms.schoolHistory} onChange={e => setCms({ ...cms, schoolHistory: e.target.value })} className="input-admin"></textarea>
          </div>
          <div className="grid-admin-2">
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vision Statement</label>
              <textarea rows="3" value={cms.vision} onChange={e => setCms({ ...cms, vision: e.target.value })} className="input-admin"></textarea>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mission Statement</label>
              <textarea rows="3" value={cms.mission} onChange={e => setCms({ ...cms, mission: e.target.value })} className="input-admin"></textarea>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-admin btn-admin-primary" style={{ justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
          <Save size={18} /> {loading ? 'Saving Changes...' : 'Save CMS Content & Publish to Public Site'}
        </button>
      </form>
    </div>
  );
}
