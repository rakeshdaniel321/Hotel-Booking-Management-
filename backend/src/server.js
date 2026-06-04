import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import './config/cloudinary.js';
import 'dotenv/config';
import multer from 'multer'

import { globalErrorHandler } from './middleware/errorHandler.js';
import inquiryRoutes from './routes/inquiryRoutes.js'
import authRoutes from './routes/adminRoutes.js'
import connectDb from './config/mongoDb.js';
import dns from "dns";
dns.setServers(['1.1.1.1', '8.8.8.8', '1.0.0.1']);

const app = express();
const port =process.env.PORT || 8000;
const upload = multer({storage:multer.memoryStorage()});


await connectDb();

//muliple origins
const allowedOrigins = ['http://localhost:5173'];


//middleware
app.use(cors({origin: allowedOrigins,credentials: true}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());
//routes
app.get('/', (req, res) => { res.send(' backend Server is running ')});


// app.post('/api/v1/inquiries', upload.single('screenshot'), InquiryController.createInquiry);

app.use("/api/admin",authRoutes);
app.use("/api/v1", inquiryRoutes);

// Global Error Handler catches anything dropped inside catch structures automatically
app.use(globalErrorHandler);



app.listen(port, () => {  
  console.log(`Server is running on port http://localhost: ${port}`);
});