import axios from 'axios';
import { parseXmlToJson, stripDollarKeys } from '../utils/xmlParser.js';
import { jobQueue } from '../queues/jobQueue.js';

const feeds = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multi-media",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=copywriting",
  "https://jobicy.com/?feed=job_feed&job_categories=business",
  "https://jobicy.com/?feed=job_feed&job_categories=management",
  "https://www.higheredjobs.com/rss/articleFeed.cfm"
];


export async function enqueueJobFeeds() {
  for (const url of feeds) {
    try {
      const { data: xml } = await axios.get(url);
      const json = await parseXmlToJson(xml);
      const jobs = stripDollarKeys(json?.rss?.channel?.item || []);

      await jobQueue.add('importJobs', { jobs, feedUrl: url });
    } catch (err) {
      console.error(`Error fetching jobs from ${url}:`, err.message);
    }
  }
}
