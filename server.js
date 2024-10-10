import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the Nishchal API');
  });

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
