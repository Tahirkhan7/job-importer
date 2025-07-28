import Bull from 'bull';
import { config } from '../config/index.js';

export const jobQueue = new Bull('job-import-queue', config.redisUrl);
