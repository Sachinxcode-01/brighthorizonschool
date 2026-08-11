# Security Architecture & Best Practices

## 1. Complete Public Isolation
- All Student, Teacher, Parent, and Staff portal logins have been **completely removed** from the Public Website.
- The Public Website exposes zero sensitive admin endpoints.
- Teachers exist solely as public faculty profile records managed via the Admin Portal (`isPublicVisible: true/false`).

## 2. Authentication & Authorization
- **JWT (JSON Web Tokens)**: All requests to `/api/v1/admin/*` require a valid JWT Bearer token signed with a secure secret key.
- **Admin Authorization Middleware**: `requireAdminAuth` validates token signature, expiration (12-hour session), and verifies the user holds `Super Admin` or `Admin` privileges.

## 3. Password Security & Rate Protection
- Admin passwords hashed using industry-standard salted bcrypt algorithms.
- Failed login attempts logged to `auditLogs` with IP address recording.

## 4. Audit Trail & Compliance
- Every administrative action (Student creation, Teacher modification, Admission approval/rejection, CMS updates, System Settings edits) is recorded in `auditLogs` with timestamps and admin user IDs.

## 5. Secrets & Environment Variables
- Database secrets, JWT keys, and SMTP credentials must be set in environment variables (`process.env`) and never hardcoded in frontend applications.
