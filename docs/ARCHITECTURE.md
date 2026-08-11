# High-Level Architecture Document: Bright Horizon School

## Overview
The Bright Horizon School platform is designed as a modular, decoupled monorepo architecture separating the **Public School Website** (`apps/website`) from the **School Administration Web Application** (`apps/admin`), connected via a **Centralized REST API** (`services/api`).

```
+-------------------------------------------------------+
|                BRIGHT HORIZON SCHOOL                  |
+-------------------------------------------------------+
                           |
         +-----------------+-----------------+
         |                                   |
         v                                   v
+------------------------+       +------------------------+
|     PUBLIC WEBSITE     |       |    ADMIN PORTAL APP    |
| (apps/website: Port 3000)|      | (apps/admin: Port 3001)|
|                        |       |                        |
| - Visitors / Parents   |       | - Authenticated Admins |
| - NO Student/Teacher   |       | - Full CRUD Management |
|   Login/Dashboard      |       | - Dynamic CMS Editor   |
+------------------------+       +------------------------+
         |                                   |
         | HTTP / REST                       | HTTP / REST (JWT Auth)
         v                                   v
+---------------------------------------------------------+
|                  SHARED REST API SERVER                 |
|                 (services/api: Port 5000)               |
|                                                         |
|  Public Endpoints:       Admin Endpoints:               |
|  - /api/v1/public/*      - /api/v1/admin/* (Protected)  |
+---------------------------------------------------------+
                           |
                           v
+---------------------------------------------------------+
|                PERSISTENT DATABASE STORE                |
|                    (db.json / JSON-DB)                  |
+---------------------------------------------------------+
```

## System Goals
1. **Security Isolation**: Public visitors have zero access to admin routes or student/teacher private records.
2. **Real-time CMS Synchronization**: Administrative updates to Principal Messages, Notices, Events, Gallery, or Faculty profiles instantly reflect on the public website.
3. **No Non-Admin Portals**: Eliminates legacy multi-role login confusion on the public site.
