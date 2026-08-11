import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentsModule from './pages/StudentsModule';
import TeachersModule from './pages/TeachersModule';
import StaffModule from './pages/StaffModule';
import AdmissionsModule from './pages/AdmissionsModule';
import AcademicsModule from './pages/AcademicsModule';
import AttendanceModule from './pages/AttendanceModule';
import ExaminationsModule from './pages/ExaminationsModule';
import FeesModule from './pages/FeesModule';
import TimetableModule from './pages/TimetableModule';
import EventsCMS from './pages/EventsCMS';
import NoticesCMS from './pages/NoticesCMS';
import GalleryCMS from './pages/GalleryCMS';
import WebsiteCMS from './pages/WebsiteCMS';
import DownloadsCMS from './pages/DownloadsCMS';
import AchievementsCMS from './pages/AchievementsCMS';
import CalendarAdmin from './pages/CalendarAdmin';
import EnquiriesAdmin from './pages/EnquiriesAdmin';
import ReportsAdmin from './pages/ReportsAdmin';
import SettingsAdmin from './pages/SettingsAdmin';
import AuditLogsAdmin from './pages/AuditLogsAdmin';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentsModule />} />
            <Route path="/teachers" element={<TeachersModule />} />
            <Route path="/staff" element={<StaffModule />} />
            <Route path="/admissions" element={<AdmissionsModule />} />
            <Route path="/academics" element={<AcademicsModule />} />
            <Route path="/attendance" element={<AttendanceModule />} />
            <Route path="/examinations" element={<ExaminationsModule />} />
            <Route path="/fees" element={<FeesModule />} />
            <Route path="/timetable" element={<TimetableModule />} />
            <Route path="/events-cms" element={<EventsCMS />} />
            <Route path="/notices-cms" element={<NoticesCMS />} />
            <Route path="/gallery-cms" element={<GalleryCMS />} />
            <Route path="/website-cms" element={<WebsiteCMS />} />
            <Route path="/downloads-cms" element={<DownloadsCMS />} />
            <Route path="/achievements-cms" element={<AchievementsCMS />} />
            <Route path="/calendar-admin" element={<CalendarAdmin />} />
            <Route path="/enquiries" element={<EnquiriesAdmin />} />
            <Route path="/reports" element={<ReportsAdmin />} />
            <Route path="/settings" element={<SettingsAdmin />} />
            <Route path="/audit-logs" element={<AuditLogsAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
