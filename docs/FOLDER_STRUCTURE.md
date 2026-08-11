# Bright Horizon School - Folder Structure Guide

## Overview
This document describes the production monorepo folder architecture for the **Bright Horizon School** platform.

```
bright-horizon-school/
├── apps/
│   ├── website/                      # Next.js App Router Public School Website
│   │   ├── src/
│   │   │   ├── app/                  # App Router Page Containers
│   │   │   ├── components/           # Shared UI, Layout, & Vanta 3D components
│   │   │   ├── features/             # Modular Feature Folders (admissions, faculty, contact, chatbot)
│   │   │   ├── services/             # API client
│   │   │   ├── constants/            # Routes & School constants
│   │   │   ├── config/               # Site configuration
│   │   │   └── types/                # TypeScript DTOs
│   │   └── package.json
│   │
│   └── admin/                        # School Administration Portal Application
│       ├── src/
│       │   ├── components/           # Shared Admin UI
│       │   ├── features/             # auth, dashboard, students, teachers, cms
│       │   └── pages/                # Admin Module Views
│       └── package.json
│
├── packages/
│   ├── shared-types/                 # Shared DTOs
│   ├── shared-utils/                 # Currency & Date Formatters
│   └── api-client/                   # HTTP Fetcher
│
├── services/
│   └── api/                          # Express REST API Backend
│
└── docs/                             # Architecture Reports & Documentation
```

## Feature Module Rules
Each feature owns its components, hooks, services, schemas, and types:
- `features/admissions/`: `AdmissionForm.tsx`, `FeeTable.tsx`, `admission.schema.ts`, `admissions.service.ts`
- `features/contact/`: `ContactForm.tsx`, `OfficeDetails.tsx`, `contact.schema.ts`, `contact.service.ts`
- `features/faculty/`: `FacultyCard.tsx`, `FacultyFilter.tsx`, `faculty.service.ts`
- `features/chatbot/`: `ChatbotModal.tsx`, `chatbot.service.ts`
