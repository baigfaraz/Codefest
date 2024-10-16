import express from 'express'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import connectDB from './config/db.js'; 
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; 
import userRoutes from './routes/userRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js'; 
import projectRoutes from './routes/projectRoutes.js';

dotenv.config(); 

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/workspaces', workspaceRoutes); 
app.use('/api/projects', projectRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
