# CMS & Content Synchronization - Bright Horizon School

## Overview
The Content Management System (CMS) workflow connects the private **Admin Portal** to the **Public School Website** via the **Shared REST API Server**.

## Publishing Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Admin as School Administrator
    participant AP as Admin Portal (apps/admin)
    participant API as Express API (services/api)
    participant DB as JSON Data Store (db.json)
    participant PW as Public Website (apps/website)
    actor Visitor as Website Visitor

    Admin->>AP: 1. Input Notice / News / Event details
    AP->>API: 2. POST /api/v1/admin/notices (JWT Bearer Token)
    API->>API: 3. Verify Admin Authorization & Validate Payload
    API->>DB: 4. Write Record & Log Action in Audit Stream
    API-->>AP: 5. Return 201 Created Status
    
    Visitor->>PW: 6. Visit /events or Homepage
    PW->>API: 7. GET /api/v1/public/notices (ISR 60s Revalidation)
    API-->>PW: 8. Return Published Notices Payload
    PW-->>Visitor: 9. Render Updated Notice Banner
```

## Content Types Managed via CMS

1. **Urgent Notices**: Category, Title, Content, Priority Flag (`isImportant`), Publish Date.
2. **School Events**: Title, Description, Date, Time, Venue, Category, Header Image URL.
3. **News Articles**: Title, Content, Author, Image URL, Publish Date.
4. **Faculty Profiles**: Teacher Name, Designation, Department, Subject, Qualification, Experience, Public Visibility Toggle (`isPublic`).
5. **Photo & Video Gallery**: Album Title, Event Date, Category, Images Array (`url`, `caption`).
6. **Student & School Achievements**: Award Title, Recipient Name, Category, Year, Image URL, Description.
7. **Document Downloads**: Title, Category, File Size, File URL, Upload Date.
8. **Homepage & Site Content**: Hero Title, Hero Subtitle, Principal Name, Principal Message, Principal Photo URL, Core Educational Values.
