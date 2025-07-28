import { Job } from "../models/Job.js";
import { ImportLog } from "../models/ImportLog.js";

export async function processJobs({ jobs, feedUrl }) {
  const operations = [];
  let newJobs = 0;
  let updatedJobs = 0;
  let failedJobs = 0;
  const failures = [];

  for (const item of jobs) {
    const jobId =
      typeof item.guid === "object"
        ? item.guid._
        : item.guid || typeof item.link === "object"
        ? item.link._
        : item.link;
    if (!jobId) continue;

    const jobData = {
      jobId:
        typeof item.guid === "object"
          ? item.guid._
          : item.guid || typeof item.link === "object"
          ? item.link._
          : item.link,
      title: typeof item.title === "object" ? item.title._ : item.title,
      company:
        typeof item["dc:creator"] === "object"
          ? item["dc:creator"]._
          : item["dc:creator"] || "Unknown",
      location:
        typeof item.location === "object"
          ? item.location._
          : item.location || "",
      url: typeof item.link === "object" ? item.link._ : item.link,
      description:
        typeof item.description === "object"
          ? item.description._
          : item.description || "",
      createdAt: new Date(item.pubDate),
    };

    operations.push({
      updateOne: {
        filter: { jobId },
        update: jobData,
        upsert: true,
      },
    });
  }

  try {
    const result = await Job.bulkWrite(operations);
    newJobs = result.upsertedCount || 0;
    updatedJobs = result.modifiedCount || 0;
  } catch (err) {
    failedJobs = jobs.length;
    failures.push(err.message);
  }

  try {
    await ImportLog.create({
      feedUrl,
      totalFetched: jobs.length,
      newJobs,
      updatedJobs,
      failedJobs,
      failures,
    });
  } catch (err) {
    console.error("Failed to save log:", err.message);
  }
}
