# Development & Workflow Guide - Bright Horizon School

## Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

## Getting Started

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/Sachinxcode-01/brighthorizonschool.git
   cd brighthorizonschool
   npm install
   ```

2. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```

3. **Start Development Environment**:
   ```bash
   npm run dev
   ```
   This launches concurrently:
   - Shared API Backend on `http://localhost:5000`
   - Public Website on `http://localhost:3000`
   - Admin Portal Application on `http://localhost:3001`

4. **Run Individual Services**:
   ```bash
   npm run dev:website  # Run Public Next.js Website only
   npm run dev:admin    # Run Admin Portal App only
   npm run dev:api      # Run Express API Backend only
   ```

5. **Type Checking & Verification**:
   ```bash
   npm run type-check   # Run TypeScript verification
   npm run build        # Production build verification
   ```
