import React, { useEffect, useState } from 'react';
import { Plus, Calendar, Edit2, Trash2, Globe, EyeOff, X } from 'lucide-react';
import { adminApi } from '../services/api';

export default function EventsCMS() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '09:00 AM',
    location: '',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1564069114553-74154c41864e?w=800&q=80',
    isPublic: true
  });

  const loadData = async () => {
    const res = await adminApi.resource('events').getAll();
    if (res.success) setEvents(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:30 AM',
        location: 'Main Auditorium',
        category: 'Cultural',
        imageUrl: 'https://images.unsplash.com/photo-1564069114553-74154c41864e?w=800&q=80',
        isPublic: true
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await adminApi.resource('events').update(editingItem.id, formData);
    } else {
      await adminApi.resource('events').create(formData);
    }
    setModalOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event?')) {
      await adminApi.resource('events').delete(id);
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Website Events CMS</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Publish and manage campus events displayed on the public school website.
          </p>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-admin btn-admin-primary">
          <Plus size={16} /> Post New Event
        </button>
      </div>

      <div className="grid-admin-2">
        {events.map(ev => (
          <div key={ev.id} className="admin-card" style={{ display: 'flex', gap: '16px' }}>
            <img src={ev.imageUrl} alt={ev.title} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="badge-status badge-active">{ev.category}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => handleOpenModal(ev)} className="btn-admin btn-admin-secondary" style={{ padding: '4px 8px' }}><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(ev.id)} className="btn-admin btn-admin-danger" style={{ padding: '4px 8px' }}><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'white', marginTop: '6px' }}>{ev.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 8px' }}>{ev.description}</p>
              <div style={{ fontSize: '0.78rem', color: 'var(--admin-primary)' }}>
                {ev.date} • {ev.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ color: 'white', fontSize: '1.2rem' }}>{editingItem ? 'Edit Event' : 'Publish New Event'}</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Event Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="input-admin" />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Description</label>
                <textarea rows="3" required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="input-admin"></textarea>
              </div>
              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="input-admin" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location / Venue</label>
                  <input type="text" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="input-admin" />
                </div>
              </div>
              <button type="submit" className="btn-admin btn-admin-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                Save & Publish Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
