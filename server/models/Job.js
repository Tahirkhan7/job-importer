import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobId: { type: String, unique: true, index: true },
  title: String,
  company: String,
  location: String,
  url: String,
  description: String,
  createdAt: Date,
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);
