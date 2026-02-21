import Papa from 'papaparse';
import { config } from '../config/env';

interface ParseResult<T> {
  data: T[];
  errors: Papa.ParseError[];
}

let cache: { data: any[] | null; timestamp: number } = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchGoogleSheet<T>(): Promise<T[]> {
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    console.log('Using cached data');
    return cache.data as T[];
  }

  console.log('Fetching fresh data from Google Sheets...');
  const response = await fetch(config.googleSheet.url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const csvText = await response.text();

  const result: ParseResult<T> = await new Promise((resolve, reject) => {
    Papa.parse<T>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results as ParseResult<T>),
      error: (error: any) => reject(error),
    });
  });

  if (result.errors.length > 0) {
    console.warn('CSV parsing warnings:', result.errors);
  }

  cache = { data: result.data, timestamp: now };
  return result.data;
}

export function clearCache() {
  cache = { data: null, timestamp: 0 };
}