import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Briefcase,
  FileCheck,
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  CreditCard,
  Clock,
  Calendar,
  Bell,
  Image,
  Globe,
  Download,
  Award,
  MessageSquare,
  BarChart3,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ isCollapsed, onToggle }) {
  const menuGroups = [
    {
      title: 'CORE MANAGEMENT',
      items: [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
        { name: 'Students', path: '/students', icon: <GraduationCap size={18} /> },
        { name: 'Teachers', path: '/teachers', icon: <Users size={18} /> },
        { name: 'Staff Records', path: '/staff', icon: <Briefcase size={18} /> },
        { name: 'Admissions', path: '/admissions', icon: <FileCheck size={18} /> }
      ]
    },
    {
      title: 'ACADEMICS & OPERATIONS',
      items: [
        { name: 'Academics & Classes', path: '/academics', icon: <BookOpen size={18} /> },
        { name: 'Attendance', path: '/attendance', icon: <CalendarCheck size={18} /> },
        { name: 'Examinations & Marks', path: '/examinations', icon: <FileSpreadsheet size={18} /> },
        { name: 'Fees & Payments', path: '/fees', icon: <CreditCard size={18} /> },
        { name: 'Timetable & Rooms', path: '/timetable', icon: <Clock size={18} /> }
      ]
    },
    {
      title: 'WEBSITE CMS & CONTENT',
      items: [
        { name: 'Events CMS', path: '/events-cms', icon: <Calendar size={18} /> },
        { name: 'Notices & News CMS', path: '/notices-cms', icon: <Bell size={18} /> },
        { name: 'Gallery CMS', path: '/gallery-cms', icon: <Image size={18} /> },
        { name: 'Website Pages CMS', path: '/website-cms', icon: <Globe size={18} /> },
        { name: 'Downloads CMS', path: '/downloads-cms', icon: <Download size={18} /> },
        { name: 'Achievements CMS', path: '/achievements-cms', icon: <Award size={18} /> }
      ]
    },
    {
      title: 'ADMINISTRATION & SYSTEM',
      items: [
        { name: 'Calendar Admin', path: '/calendar-admin', icon: <Calendar size={18} /> },
        { name: 'Enquiries & Submissions', path: '/enquiries', icon: <MessageSquare size={18} /> },
        { name: 'Reports & Exports', path: '/reports', icon: <BarChart3 size={18} /> },
        { name: 'System Settings', path: '/settings', icon: <Settings size={18} /> },
        { name: 'Audit Logs', path: '/audit-logs', icon: <ShieldAlert size={18} /> }
      ]
    }
  ];

  return (
    <aside style={{
      width: isCollapsed ? '70px' : '260px',
      background: 'var(--admin-surface)',
      borderRight: '1px solid var(--border-admin)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand Header */}
      <div style={{
        height: '70px',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        borderBottom: '1px solid var(--border-admin)'
      }}>
        {!isCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'var(--admin-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: 'white'
            }}>
              BH
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'white', lineHeight: 1.1 }}>
                Bright Horizon
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--admin-primary)', fontWeight: 600, letterSpacing: '0.05em' }}>
                ADMIN PORTAL
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 10px' }}>
        {menuGroups.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            {!isCollapsed && (
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--text-subtle)',
                letterSpacing: '0.08em',
                padding: '0 8px 8px'
              }}>
                {group.title}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.name : ''}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'white' : 'var(--text-muted)',
                    background: isActive ? 'var(--admin-primary)' : 'transparent',
                    justifyContent: isCollapsed ? 'center' : 'flex-start'
                  })}
                >
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
