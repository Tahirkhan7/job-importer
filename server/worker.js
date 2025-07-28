import mongoose from 'mongoose';
import { jobQueue } from './queues/jobQueue.js';
import { config } from './config/index.js';
import { processJobs } from './jobs/processJobs.js';

await mongoose.connect(config.mongoUri);

jobQueue.process('importJobs', config.concurrency, async (job) => {
  const { jobs, feedUrl } = job.data;
  await processJobs({ jobs, feedUrl });
  return true;
});
