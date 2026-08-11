# Deployment Guide

## Target Architecture & Domains
- **Public School Website**: `bright-horizon-school.vercel.app` (Hosted on Vercel)
- **Admin Portal Application**: `admin.bright-horizon-school.com` (Hosted on Vercel / Render / Netlify)
- **Shared API Backend**: `api.bright-horizon-school.com` (Hosted on Render / Railway / Node server)

## 1. Local Development Setup
Run the following from the root monorepo directory:

```bash
# Install dependencies
npm install

# Run backend API server, public website, and admin portal concurrently:
npm run dev

# Or run services individually:
npm run dev:api     # API Server on http://localhost:5000
npm run dev:website # Public Site on http://localhost:3000
npm run dev:admin   # Admin Portal on http://localhost:3001
```

## 2. Production Build Commands
```bash
# Build all workspaces
npm run build

# Or build individual applications:
npm run build:website
npm run build:admin
npm run build:api
```

## 3. Vercel Deployment for Public Website
1. Point Vercel to `apps/website`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set Environment Variable: `VITE_API_URL=https://api.bright-horizon-school.com`

## 4. Vercel / Netlify Deployment for Admin Application
1. Point host to `apps/admin`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set Environment Variable: `VITE_API_URL=https://api.bright-horizon-school.com`
