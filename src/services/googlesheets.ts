import Papa from 'papaparse';
import { config } from '../config/env';

interface ParseResult<T> {
  data: T[];
  errors: Papa.ParseError[];
}

interface CacheEntry<T> {
  data: T[] | null;
  timestamp: number;
}

/**
 * GoogleSheetsService - Singleton service for fetching and caching Google Sheets data
 * 
 * Benefits over module-level functions:
 * - Testable: Can mock the instance in tests
 * - Configurable: Cache duration and URL can be injected
 * - Encapsulated: State is properly private
 * - Extensible: Can be subclassed if needed
 */
export class GoogleSheetsService {
  private static instance: GoogleSheetsService | null = null;
  private cache: CacheEntry<any> = { data: null, timestamp: 0 };
  private readonly cacheDuration: number;
  private readonly sheetUrl: string;

  private constructor(sheetUrl: string, cacheDuration: number = 5 * 60 * 1000) {
    this.sheetUrl = sheetUrl;
    this.cacheDuration = cacheDuration;
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(
    sheetUrl?: string,
    cacheDuration?: number
  ): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService(
        sheetUrl || config.googleSheet.url,
        cacheDuration
      );
    }
    return GoogleSheetsService.instance;
  }

  /**
   * Reset the singleton instance (useful for testing)
   */
  public static resetInstance(): void {
    GoogleSheetsService.instance = null;
  }

  /**
   * Fetch data from Google Sheet with automatic caching
   */
  public async fetch<T>(): Promise<T[]> {
    const now = Date.now();
    
    // Return cached data if still valid
    if (this.cache.data && now - this.cache.timestamp < this.cacheDuration) {
      console.log('[GoogleSheetsService] Using cached data');
      return this.cache.data as T[];
    }

    console.log('[GoogleSheetsService] Fetching fresh data from Google Sheets...');
    
    try {
      const response = await fetch(this.sheetUrl);

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
        console.warn('[GoogleSheetsService] CSV parsing warnings:', result.errors);
      }

      // Update cache
      this.cache = { data: result.data, timestamp: now };
      
      return result.data;
    } catch (error) {
      console.error('[GoogleSheetsService] Fetch error:', error);
      throw error;
    }
  }

  /**
   * Clear the cache manually
   */
  public clearCache(): void {
    this.cache = { data: null, timestamp: 0 };
    console.log('[GoogleSheetsService] Cache cleared');
  }

  /**
   * Check if cache is valid
   */
  public isCacheValid(): boolean {
    if (!this.cache.data) return false;
    const age = Date.now() - this.cache.timestamp;
    return age < this.cacheDuration;
  }

  /**
   * Get cache age in seconds
   */
  public getCacheAge(): number {
    if (!this.cache.data) return -1;
    return Math.floor((Date.now() - this.cache.timestamp) / 1000);
  }
}

// Convenience exports for backward compatibility
// These delegate to the singleton instance
export async function fetchGoogleSheet<T>(): Promise<T[]> {
  return GoogleSheetsService.getInstance().fetch<T>();
}

export function clearCache(): void {
  GoogleSheetsService.getInstance().clearCache();
}