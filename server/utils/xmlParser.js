import { parseStringPromise } from 'xml2js';

export async function parseXmlToJson(xmlData) {
  const json = await parseStringPromise(xmlData, { explicitArray: false });
  return json;
}

export function stripDollarKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(stripDollarKeys);
  } else if (typeof obj === 'object' && obj !== null) {
    const clean = {};
    for (const [key, value] of Object.entries(obj)) {
      if (!key.startsWith('$')) {
        clean[key] = stripDollarKeys(value);
      }
    }
    return clean;
  }
  return obj;
}
