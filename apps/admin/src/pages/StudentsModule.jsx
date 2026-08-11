import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, GraduationCap, X } from 'lucide-react';
import { adminApi } from '../services/api';

export default function StudentsModule() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    admissionNo: '',
    rollNo: '',
    name: '',
    gender: 'Male',
    dob: '',
    className: 'Grade 10',
    section: 'A',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    status: 'Active'
  });

  const loadData = async () => {
    const res = await adminApi.resource('students').getAll();
    if (res.success) setStudents(res.data);
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
        admissionNo: `BHS-2026-${Math.floor(100 + Math.random() * 900)}`,
        rollNo: `${Math.floor(1000 + Math.random() * 9000)}`,
        name: '',
        gender: 'Male',
        dob: '2011-01-01',
        className: 'Grade 10',
        section: 'A',
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        address: '',
        status: 'Active'
      });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await adminApi.resource('students').update(editingItem.id, formData);
    } else {
      await adminApi.resource('students').create({ ...formData, joiningDate: new Date().toISOString().split('T')[0] });
    }
    setModalOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this student record?')) {
      await adminApi.resource('students').delete(id);
      loadData();
    }
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
    s.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Student Records Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage student profiles, enrollments, section assignments, and parent information.
          </p>
        </div>

        <button onClick={() => handleOpenModal()} className="btn-admin btn-admin-primary">
          <Plus size={16} /> Register New Student
        </button>
      </div>

      {/* Filter & Table Card */}
      <div className="admin-card">
        <div style={{ marginBottom: '16px', maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Filter by name, admission no, grade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-admin"
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Grade & Section</th>
                <th>Parent Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600, color: 'var(--admin-primary)' }}>{s.admissionNo}</td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>{s.className} - {s.section}</td>
                  <td>
                    <div>{s.parentName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.parentPhone}</div>
                  </td>
                  <td>
                    <span className={`badge-status ${s.status === 'Active' ? 'badge-active' : 'badge-pending'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleOpenModal(s)} className="btn-admin btn-admin-secondary" style={{ padding: '4px 8px' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="btn-admin btn-admin-danger" style={{ padding: '4px 8px' }}>
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
              <h2 style={{ fontSize: '1.2rem', color: 'white' }}>{editingItem ? 'Edit Student Record' : 'Add New Student'}</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admission No</label>
                  <input type="text" required value={formData.admissionNo} onChange={e => setFormData({ ...formData, admissionNo: e.target.value })} className="input-admin" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input-admin" />
                </div>
              </div>

              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class / Grade</label>
                  <select value={formData.className} onChange={e => setFormData({ ...formData, className: e.target.value })} className="input-admin">
                    {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Section</label>
                  <input type="text" required value={formData.section} onChange={e => setFormData({ ...formData, section: e.target.value })} className="input-admin" />
                </div>
              </div>

              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parent Name</label>
                  <input type="text" required value={formData.parentName} onChange={e => setFormData({ ...formData, parentName: e.target.value })} className="input-admin" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parent Phone</label>
                  <input type="text" required value={formData.parentPhone} onChange={e => setFormData({ ...formData, parentPhone: e.target.value })} className="input-admin" />
                </div>
              </div>

              <div className="grid-admin-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parent Email</label>
                  <input type="email" required value={formData.parentEmail} onChange={e => setFormData({ ...formData, parentEmail: e.target.value })} className="input-admin" />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="input-admin">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-admin btn-admin-primary" style={{ justifyContent: 'center', marginTop: '10px' }}>
                Save Student Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
