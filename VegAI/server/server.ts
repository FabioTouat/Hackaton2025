import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { populateVegetables } from './models/vegetable';
import authRoutes from './routes/auth';
import aiRoutes from './routes/ai';
import vegetablesRoutes from './routes/vegetables';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB().then(() => {
  console.log('Connected to MongoDB');
  // Appel de la fonction populate pour insérer les légumes dans la collection "vegetables"
  populateVegetables();
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/vegetables', vegetablesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 