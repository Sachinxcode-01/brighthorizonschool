import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Briefcase,
  FileCheck,
  CreditCard,
  Bell,
  Calendar,
  Plus,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { adminApi } from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboardStats().then(res => {
      if (res.success) {
        setData(res);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={{ color: 'white', padding: '20px' }}>Loading Dashboard Analytics...</div>;
  }

  const stats = data?.stats || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header & Quick Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Admin Overview Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time analytics, student counts, admissions, and website management status.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/students" className="btn-admin btn-admin-primary">
            <Plus size={16} /> Add Student
          </Link>
          <Link to="/teachers" className="btn-admin btn-admin-secondary">
            <Plus size={16} /> Add Teacher
          </Link>
          <Link to="/notices-cms" className="btn-admin btn-admin-secondary">
            <Plus size={16} /> Post Notice
          </Link>
        </div>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid-admin-4">
        <div className="admin-card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>TOTAL STUDENTS</span>
            <GraduationCap size={22} style={{ color: '#3b82f6' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{stats.totalStudents || 0}</div>
          <div style={{ color: '#4ade80', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> Active Academic Roster
          </div>
        </div>

        <div className="admin-card" style={{ borderLeft: '4px solid #06b6d4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>FACULTY & TEACHERS</span>
            <Users size={22} style={{ color: '#06b6d4' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{stats.totalTeachers || 0}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Teaching Staff Members</div>
        </div>

        <div className="admin-card" style={{ borderLeft: '4px solid #eab308' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>PENDING ADMISSIONS</span>
            <FileCheck size={22} style={{ color: '#eab308' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{stats.pendingAdmissions || 0}</div>
          <div style={{ color: '#fde047', fontSize: '0.78rem' }}>Requires Admin Review</div>
        </div>

        <div className="admin-card" style={{ borderLeft: '4px solid #22c55e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>FEE COLLECTIONS</span>
            <CreditCard size={22} style={{ color: '#22c55e' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
            ₹{(stats.totalRevenue || 0).toLocaleString()}
          </div>
          <div style={{ color: '#4ade80', fontSize: '0.78rem' }}>Recorded Payments</div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid-admin-2">
        {/* Recent Admissions */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'white' }}>Recent Admission Applications</h3>
            <Link to="/admissions" style={{ fontSize: '0.82rem', color: 'var(--admin-primary)' }}>View All</Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Grade</th>
                <th>Parent Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentAdmissions || []).map(adm => (
                <tr key={adm.id}>
                  <td style={{ fontWeight: 600 }}>{adm.applicantName}</td>
                  <td>{adm.gradeApplying}</td>
                  <td>{adm.email}</td>
                  <td>
                    <span className={`badge-status ${adm.status === 'Approved' ? 'badge-active' : adm.status === 'Rejected' ? 'badge-rejected' : 'badge-pending'}`}>
                      {adm.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Fee Payments */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'white' }}>Recent Fee Payments</h3>
            <Link to="/fees" style={{ fontSize: '0.82rem', color: 'var(--admin-primary)' }}>View All</Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentPayments || []).map(pay => (
                <tr key={pay.id}>
                  <td style={{ fontWeight: 600 }}>{pay.receiptNo}</td>
                  <td>{pay.studentName}</td>
                  <td style={{ color: '#4ade80', fontWeight: 600 }}>₹{pay.amountPaid?.toLocaleString()}</td>
                  <td>{pay.paymentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
