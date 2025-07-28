import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config/index.js';
import importRoutes from './routes/importRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', importRoutes);

mongoose.connect(config.mongoUri).then(() => {
  console.log('Connected to MongoDB');

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});
