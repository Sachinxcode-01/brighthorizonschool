# Authentication & Authorization System - Bright Horizon School

## Core Architectural Boundary

> [!IMPORTANT]
> **Single Authentication Domain**:
> The ONLY privileged login allowed in the Bright Horizon School platform is **ADMIN LOGIN**.
> The Public Website (`apps/website`) has **ZERO Student, Parent, or Teacher login portals**.

```
Public School Website (bright-horizon-school.vercel.app)
├── No Login Forms
├── No Session Cookies
└── Read-Only Public Content Access

Admin Portal Application (admin.bright-horizon-school.com)
├── Isolated Domain
├── Admin Credentials Login (/login)
└── Protected Enterprise Management Routes
```

## Admin Authentication Flow

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrator
    participant UI as Admin Login View
    participant API as Express API (/api/v1/admin)
    participant Auth as Auth Middleware

    Admin->>UI: Input Admin Credentials (email/password)
    UI->>API: POST /api/v1/admin/login
    API->>API: Verify Password Hash & Role
    API-->>UI: Return JWT Access Token + Admin Profile
    UI->>UI: Store Token in Session State & Memory
    
    Admin->>UI: Navigate to Protected Route (/students)
    UI->>API: GET /api/v1/admin/students (Header: Authorization: Bearer <token>)
    API->>Auth: Verify JWT Signature & Admin Role
    Auth-->>API: Grant Authorization
    API-->>UI: Return Student Records Dataset
```

## Token Configuration & Security Standards
- **Token Type**: JSON Web Token (JWT)
- **Algorithm**: HS256
- **Expiration**: 8 hours (standard administrator shift)
- **Header Format**: `Authorization: Bearer <jwt_token>`
- **Role Verification**: Middleware validates `role === 'ADMIN'` on every protected request.
