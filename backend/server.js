import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import translationRoutes from './routes/translations.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB (non-blocking for serverless)
connectDB().catch(err => console.error('Initial DB connection failed:', err));

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://translation-tool-l25e.vercel.app",
  "https://translation-tool-black.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }) 
);

// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route - CRITICAL for debugging
app.get('/api/health', async (req, res) => {
  try {
    const readyState = mongoose.connection.readyState;
    const stateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    const envCheck = {
      MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
      NODE_ENV: process.env.NODE_ENV || 'development'
    };

    // Try to connect if not connected
    if (readyState !== 1) {
      console.log('Health check: DB not connected, attempting connection...');
      await connectDB();
    }

    const dbHost = mongoose.connection.host || 'unknown';
    
    res.json({ 
      status: 'ok', 
      database: {
        state: stateMap[readyState],
        host: dbHost,
        name: mongoose.connection.name || 'unknown'
      },
      environment: envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({ 
      status: 'error', 
      database: 'connection failed',
      error: error.message,
      environment: {
        MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ MISSING - ADD THIS IN VERCEL!',
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    });
  }
});

// Routes
app.use('/api/translations', translationRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Translation Management Tool API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      translations: '/api/translations'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server (only in non-Vercel environment)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
