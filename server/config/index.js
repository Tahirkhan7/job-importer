import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  concurrency: parseInt(process.env.CONCURRENCY, 10),
  batchSize: parseInt(process.env.BATCH_SIZE, 10),
};
