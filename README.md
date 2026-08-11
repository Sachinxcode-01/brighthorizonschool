# Bright Horizon School - Decoupled Architecture

[![Architecture](https://img.shields.io/badge/Architecture-Decoupled_Monorepo-blue.svg)](#architecture)
[![Public Website](https://img.shields.io/badge/Public_Site-bright--horizon--school.vercel.app-success.svg)](https://bright-horizon-school.vercel.app/)
[![Admin Portal](https://img.shields.io/badge/Admin_Portal-admin.bright--horizon--school.com-purple.svg)](#admin-portal)

A senior full-stack architectural refactoring of the **Bright Horizon School** platform into two completely independent web applications powered by a shared REST API server:

1. **PUBLIC SCHOOL WEBSITE (`apps/website`)**
   - **Target Domain**: `bright-horizon-school.vercel.app`
   - **Access**: Public school information ONLY for visitors, parents, prospective students, and the general community.
   - **REMOVED**: All Student, Teacher, Parent, and Staff logins and dashboards are completely removed.
   - **Faculty**: Featured as public educator profiles (Photo, Name, Designation, Department, Subject, Qualification, Experience) without accounts or dashboards.
   - **Admin Link**: Discrete secure redirect link for Admin Login.

2. **ADMINISTRATION WEB APPLICATION (`apps/admin`)**
   - **Target Domain**: `admin.bright-horizon-school.com`
   - **Access**: Private internal application for authorized school administrators only.
   - **Features**: Full enterprise dashboard with modules for Students, Teachers, Staff, Admissions, Academics, Attendance, Examinations, Fees, Timetable, Events CMS, Notices CMS, Gallery CMS, Website Pages CMS, Downloads CMS, Achievements CMS, Calendar, Enquiries, Reports, System Settings, and Audit Logs.

3. **SHARED REST API BACKEND (`services/api`)**
   - **Public Endpoints**: `/api/v1/public/*` (Unauthenticated endpoints for notices, events, faculty, gallery, CMS text, admission enquiries, contact submissions, AI chatbot).
   - **Admin Endpoints**: `/api/v1/admin/*` (JWT authenticated endpoints for admin login and full CRUD operations).

---

## Monorepo Directory Structure

```
brighthorizonschool/
├── apps/
│   ├── website/              # Public School Website (Vite + React + Vanilla CSS)
│   │   ├── src/
│   │   │   ├── components/  # Navbar, Footer, AI Assistant Chatbot, Notice Banner
│   │   │   ├── pages/       # Home, About, Academics, Faculty, Facilities, Admissions,
│   │   │   │                # Events, Gallery, Achievements, Downloads, Calendar,
│   │   │   │                # FAQ, Contact, Policies
│   │   │   ├── services/    # Public API Client
│   │   │   └── index.css    # Premium CSS design tokens & animations
│   │   └── package.json
│   │
│   └── admin/                # Separate Admin Application (Vite + React + Enterprise Dashboard UI)
│       ├── src/
│       │   ├── components/  # Sidebar, Header, AdminLayout
│       │   ├── context/     # AuthContext
│       │   ├── pages/       # Login, Dashboard, Students, Teachers, Staff, Admissions,
│       │   │                # Academics, Attendance, Examinations, Fees, Timetable,
│       │   │                # EventsCMS, NoticesCMS, GalleryCMS, WebsiteCMS, DownloadsCMS,
│       │   │                # AchievementsCMS, CalendarAdmin, EnquiriesAdmin, Reports,
│       │   │                # Settings, AuditLogs
│       │   ├── services/    # Admin API Client (JWT Interceptor)
│       │   └── index.css    # Professional Enterprise UI Styles
│       └── package.json
│
├── services/
│   └── api/                  # Express REST API Server & Database
│       ├── src/
│       │   ├── controllers/ # Public & Admin Controllers
│       │   ├── middleware/  # JWT Auth & Security Middleware
│       │   ├── db/          # JSON File DB & Rich Seed Data
│       │   ├── routes/      # Public & Admin Express Routes
│       │   └── server.js    # Main Server Entrypoint (Port 5000)
│       └── package.json
│
├── packages/
│   └── shared-types/         # Shared TypeScript DTOs & Interfaces
│
├── docs/                     # Detailed Architectural & Module Documentation
│   ├── ARCHITECTURE.md
│   ├── PUBLIC_WEBSITE.md
│   ├── ADMIN_PORTAL.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   └── DEPLOYMENT.md
│
├── README.md
└── package.json
```

---

## Getting Started & Local Development

### Prerequisites
- Node.js (v18+) & npm

### Installation
```bash
# Clone the repository
git clone https://github.com/Sachinxcode-01/brighthorizonschool.git
cd brighthorizonschool

# Install all dependencies across monorepo workspaces
npm install
```

### Running the System
```bash
# Run all services concurrently (API, Public Website, Admin Portal):
npm run dev

# Or run individual applications:
npm run dev:api      # Express API Server on http://localhost:5000
npm run dev:website  # Public School Website on http://localhost:3000
npm run dev:admin    # Admin Portal Application on http://localhost:3001
```

---

## Admin Portal Default Credentials
- **URL**: `http://localhost:3001/login`
- **Username**: `admin`
- **Password**: `admin123`

---

## Real-Time CMS Synchronization Workflow
When an Administrator edits content in the Admin Portal (e.g. updating the Principal Message in **Website Pages CMS** or toggling a teacher's **Public Visibility** in **Teachers**):
1. The Admin Portal sends an authenticated `PUT` request to `/api/v1/admin/cms` or `/api/v1/admin/teachers/:id`.
2. The Shared API Server updates the database store `db.json`.
3. The Public Website automatically fetches the updated data on subsequent page loads or API refreshes from `/api/v1/public/*`.

---

## Documentation Index
- [System Architecture](docs/ARCHITECTURE.md)
- [Public Website Specs](docs/PUBLIC_WEBSITE.md)
- [Admin Portal Specs](docs/ADMIN_PORTAL.md)
- [REST API Reference](docs/API.md)
- [Database & Models](docs/DATABASE.md)
- [Security Architecture](docs/SECURITY.md)
- [Deployment Guide](docs/DEPLOYMENT.md)