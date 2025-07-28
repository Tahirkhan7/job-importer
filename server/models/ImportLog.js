import mongoose from 'mongoose';

const importLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  feedUrl: String,
  totalFetched: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Number,
  failures: [String],
});

export const ImportLog = mongoose.model('ImportLog', importLogSchema);
