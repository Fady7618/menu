import { GoogleSheetsService } from './googlesheets';
import type { MenuItemRaw, MenuItem } from '../types/MenuItem';
import type { MenuCategory } from '../types/MenuCategory';
import { performanceConfig } from '../config/carousel';

/**
 * MenuService - Optimized singleton service for menu data operations
 * 
 * Improvements:
 * - Extended cache duration (15 minutes vs 5)
 * - In-memory category grouping cache
 * - Prefetching support
 * - Batch operations
 */
export class MenuService {
  private static instance: MenuService | null = null;
  private dataSource: GoogleSheetsService;
  
  // Enhanced caching
  private categoryCache: Map<string, MenuItem[]> = new Map();
  private categoriesListCache: MenuCategory[] | null = null;
  private lastCacheTime: number = 0;

  private constructor(dataSource: GoogleSheetsService) {
    this.dataSource = dataSource;
  }

  /**
   * Get the singleton instance with optimized cache duration
   */
  public static getInstance(dataSource?: GoogleSheetsService): MenuService {
    if (!MenuService.instance) {
      // Use extended cache duration from config (15 minutes)
      const optimizedDataSource = dataSource || 
        GoogleSheetsService.getInstance(undefined, performanceConfig.cacheTimeout);
      MenuService.instance = new MenuService(optimizedDataSource);
    }
    return MenuService.instance;
  }

  /**
   * Reset the singleton instance (useful for testing)
   */
  public static resetInstance(): void {
    MenuService.instance = null;
  }

  /**
   * Clear all caches
   */
  private clearInternalCaches(): void {
    this.categoryCache.clear();
    this.categoriesListCache = null;
    this.lastCacheTime = 0;
  }

  /**
   * Transform raw menu item data to application format
   */
  private transformMenuItem(raw: MenuItemRaw): MenuItem {
    return {
      id: raw.Id,
      name: raw.Name,
      description: raw.Description,
      price: raw.Price ?? 0,
      category: raw.Category ?? '',
      isAvailable: raw.Available === true || raw.Available === 'TRUE',
      imageUrl: raw.Image,
      formattedPrice: `$${(raw.Price ?? 0).toFixed(2)}`,
    };
  }

  /**
   * Validate raw menu item data
   */
  private isValidRawItem(raw: MenuItemRaw): boolean {
    return raw.Id != null && !!raw.Name && !!raw.Category;
  }

  /**
   * Get all menu items with caching
   */
  public async getMenuItems(): Promise<MenuItem[]> {
    try {
      const raw = await this.dataSource.fetch<MenuItemRaw>();
      const items = raw
        .filter((r) => this.isValidRawItem(r))
        .map((r) => this.transformMenuItem(r));
      
      // Update category cache
      this.buildCategoryCache(items);
      this.lastCacheTime = Date.now();
      
      return items;
    } catch (error) {
      console.error('[MenuService] Error fetching menu items:', error);
      throw new Error('Failed to load menu items');
    }
  }

  /**
   * Build category cache for faster lookups
   */
  private buildCategoryCache(items: MenuItem[]): void {
    this.categoryCache.clear();
    
    items.forEach((item) => {
      if (item.isAvailable) {
        const categoryKey = item.category.toLowerCase();
        if (!this.categoryCache.has(categoryKey)) {
          this.categoryCache.set(categoryKey, []);
        }
        this.categoryCache.get(categoryKey)!.push(item);
      }
    });

    console.log(`[MenuService] Category cache built: ${this.categoryCache.size} categories`);
  }

  /**
   * Get only available menu items
   */
  public async getAvailableMenuItems(): Promise<MenuItem[]> {
    const items = await this.getMenuItems();
    return items.filter((item) => item.isAvailable);
  }

  /**
   * Get menu items filtered by category (optimized with cache)
   */
  public async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    // Try category cache first
    const categoryKey = category.toLowerCase();
    if (this.categoryCache.has(categoryKey)) {
      console.log(`[MenuService] Using cached category: ${category}`);
      return this.categoryCache.get(categoryKey)!;
    }

    // Fall back to full fetch if cache miss
    const items = await this.getMenuItems();
    return items.filter(
      (item) =>
        item.category.toLowerCase() === categoryKey &&
        item.isAvailable
    );
  }

  /**
   * Get all categories with item counts (cached)
   */
  public async getCategories(): Promise<MenuCategory[]> {
    // Return cached categories if available
    if (this.categoriesListCache) {
      return this.categoriesListCache;
    }

    const items = await this.getMenuItems();
    const categoryMap = new Map<string, number>();
    
    items.forEach((item) => {
      if (item.isAvailable) {
        const count = categoryMap.get(item.category) || 0;
        categoryMap.set(item.category, count + 1);
      }
    });

    this.categoriesListCache = Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return this.categoriesListCache;
  }

  /**
   * Prefetch next category for smoother navigation
   */
  public async prefetchCategory(category: string): Promise<void> {
    const categoryKey = category.toLowerCase();
    if (!this.categoryCache.has(categoryKey)) {
      // Trigger background fetch
      this.getMenuItemsByCategory(category).catch((error) => {
        console.warn('[MenuService] Prefetch failed:', error);
      });
    }
  }

  /**
   * Search menu items by query
   */
  public async searchMenuItems(query: string): Promise<MenuItem[]> {
    if (!query.trim()) return [];
    
    const items = await this.getAvailableMenuItems();
    const normalizedQuery = query.toLowerCase();
    
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery)
    );
  }

  /**
   * Clear all caches
   */
  public clearCache(): void {
    this.dataSource.clearCache();
    this.clearInternalCaches();
    console.log('[MenuService] All caches cleared');
  }

  /**
   * Get menu item by ID
   */
  public async getMenuItemById(id: number): Promise<MenuItem | null> {
    const items = await this.getMenuItems();
    return items.find((item) => item.id === id) || null;
  }

  /**
   * Get cache statistics for debugging
   */
  public getCacheStats(): {
    categoryCount: number;
    hasCategories: boolean;
    cacheAge: number;
  } {
    return {
      categoryCount: this.categoryCache.size,
      hasCategories: this.categoriesListCache !== null,
      cacheAge: this.lastCacheTime ? Date.now() - this.lastCacheTime : -1,
    };
  }
}

// Convenience exports
export async function getMenuItems(): Promise<MenuItem[]> {
  return MenuService.getInstance().getMenuItems();
}

export async function getCategories(): Promise<MenuCategory[]> {
  return MenuService.getInstance().getCategories();
}

export async function searchMenuItems(query: string): Promise<MenuItem[]> {
  return MenuService.getInstance().searchMenuItems(query);
}

export function clearCache(): void {
  MenuService.getInstance().clearCache();
}