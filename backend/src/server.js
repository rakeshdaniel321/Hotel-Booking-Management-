import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './config/cloudinary.js';
import 'dotenv/config';
import multer from 'multer';

import { globalErrorHandler } from './middleware/errorHandler.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import authRoutes from './routes/adminRoutes.js';
import connectDb from './config/mongoDb.js';
import dns from "dns";
import axios from 'axios';

// DNS Servers Setup
dns.setServers(['1.1.1.1', '8.8.8.8', '1.0.0.1']);

// Self-Ping to keep Render server awake (Every 10 minutes)
setInterval(() => {
    axios.get('https://hotel-booking-management-b130.onrender.com') 
        .then(() => console.log('Self-Ping Success: Keeping the bot awake! ⚡'))
        .catch((err) => console.error('Self-Ping Error:', err.message));
}, 10 * 60 * 1000); 

const app = express();
const port = process.env.PORT || 8000;
const upload = multer({ storage: multer.memoryStorage() });

// Database Connection
await connectDb();

// Multiple Origins for CORS
const allowedOrigins = ['http://localhost:5173', 'https://hotel-booking-management-navy.vercel.app'];

// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Route
app.get('/', (req, res) => { 
    res.send('Backend Server is running');
});

// App Routes
app.use("/api/admin", authRoutes);
app.use("/api/v1", inquiryRoutes);

// Global Error Handler
app.use(globalErrorHandler);

// Server Listener (Corrected string interpolation)
app.listen(port, () => {  
  console.log(`Server is running on: http://localhost:${port}`);
});
