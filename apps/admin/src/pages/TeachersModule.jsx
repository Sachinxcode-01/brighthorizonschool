import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { adminApi } from '../services/api';

export default function TeachersModule() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photoUrl: '',
    qualification: '',
    department: 'Mathematics',
    subject: '',
    experience: '5 Years',
    designation: 'Senior Teacher',
    email: '',
    phone: '',
    isPublicVisible: true,
    bio: ''
  });

  const loadData = async () => {
    const res = await adminApi.resource('teachers').getAll();
    if (res.success) setTeachers(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleVisibility = async (teacher) => {
    const updated = { ...teacher, isPublicVisible: !teacher.isPublicVisible };
    await adminApi.resource('teachers').update(teacher.id, updated);
    loadData();
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        qualification: 'M.Sc. / B.Ed.',
        department: 'Science',
        subject: 'Physics',
        experience: '5 Years',
        designation: 'Faculty Member',
        email: '',
        phone: '',
        isPublicVisible: true,
        bio: ''
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await adminApi.resource('teachers').update(editingItem.id, formData);
    } else {
      await adminApi.resource('teachers').create({ ...formData, joiningDate: new Date().toISOString().split('T')[0] });
    }
    setModalOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher profile?')) {
      await adminApi.resource('teachers').delete(id);
      loadData();
    }
  };

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase()) ||
    t.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Teacher & Faculty Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage teacher profiles, department mappings, and toggle public website faculty visibility.
          </p>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-admin btn-admin-primary">
          <Plus size={16} /> Add Teacher Profile
        </button>
      </div>

      <div className="admin-card">
        <div style={{ marginBottom: '16px', maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Search teachers by name or subject..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-admin"
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Department & Designation</th>
                <th>Subject & Qualification</th>
                <th>Contact</th>
                <th>Public Profile Visibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={t.photoUrl} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontWeight: 600 }}>{t.name}</span>
                  </td>
                  <td>
                    <div>{t.designation}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.department}</div>
                  </td>
                  <td>
                    <div>{t.subject}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.qualification}</div>
                  </td>
                  <td>
                    <div>{t.email}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.phone}</div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleVisibility(t)}
                      className={`btn-admin ${t.isPublicVisible !== false ? 'btn-admin-primary' : 'btn-admin-secondary'}`}
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    >
                      {t.isPublicVisible !== false ? <><Eye size={14} /> Visible on Public Site</> : <><EyeOff size={14} /> Hidden from Public</>}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleOpenModal(t)} className="btn-admin btn-admin-secondary" style={{ padding: '4px 8px' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="btn-admin btn-admin-danger" style={{ padding: '4px 8px' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'white' }}>{editingItem ? 'Edit Teacher Record' : 'Add Teacher Profile'}</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input-admin" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Photo URL</label>
                  <input type="text" value={formData.photoUrl} onChange={e => setFormData({ ...formData, photoUrl: e.target.value })} className="input-admin" />
                </div>
              </div>

              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Department</label>
                  <input type="text" required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="input-admin" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Designation</label>
                  <input type="text" required value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} className="input-admin" />
                </div>
              </div>

              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Subject Taught</label>
                  <input type="text" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="input-admin" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qualification</label>
                  <input type="text" required value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} className="input-admin" />
                </div>
              </div>

              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input-admin" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</label>
                  <input type="text" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="input-admin" />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Teacher Bio</label>
                <textarea rows="2" value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="input-admin"></textarea>
              </div>

              <button type="submit" className="btn-admin btn-admin-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                Save Teacher Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
