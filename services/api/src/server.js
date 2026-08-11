import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API v1 Routes
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/admin', adminRoutes);

// Fallback legacy routes for compatibility
app.use('/api/faculty', (req, res, next) => {
  req.url = '/faculty';
  publicRoutes(req, res, next);
});

app.use('/api/admin', (req, res, next) => {
  req.url = req.url.replace('/admin', '');
  adminRoutes(req, res, next);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Bright Horizon School API', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`Bright Horizon School API Running on Port ${PORT}`);
  console.log(`Public API: http://localhost:${PORT}/api/v1/public`);
  console.log(`Admin API:  http://localhost:${PORT}/api/v1/admin`);
  console.log(`=================================================`);
});
