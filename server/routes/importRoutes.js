import express from 'express';
import { ImportLog } from '../models/ImportLog.js';
import { enqueueJobFeeds } from '../jobs/fetchJobs.js';

const router = express.Router();

router.get('/logs', async (req, res) => {
  const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(20);
  res.json(logs);
});

router.post('/import', async (req, res) => {
  await enqueueJobFeeds();
  res.json({ status: 'Import triggered' });
});

export default router;
