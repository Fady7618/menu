import { fetchGoogleSheet } from './googlesheets';
import type { MenuItemRaw, MenuItem } from '../types/MenuItem';
import type { MenuCategory } from '../types/MenuCategory';

function transformMenuItem(raw: MenuItemRaw): MenuItem {
  return {
    id: raw.Id,
    name: raw.Name,
    description: raw.Description,
    price: raw.Price ?? 0,
    category: raw.Category,
    isAvailable: raw.Available === true || raw.Available === 'TRUE',
    imageUrl: raw.Image,
    formattedPrice: `$${(raw.Price ?? 0).toFixed(2)}`,
  };
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const raw = await fetchGoogleSheet<MenuItemRaw>();
  return raw.map(transformMenuItem);
}

export async function getAvailableMenuItems(): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter((item) => item.isAvailable);
}

export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter(
    (item) =>
      item.category.toLowerCase() === category.toLowerCase() && item.isAvailable
  );
}

export async function getCategories(): Promise<MenuCategory[]> {
  const items = await getMenuItems();
  const map = new Map<string, number>();
  items.forEach((item) => {
    if (item.isAvailable) {
      map.set(item.category, (map.get(item.category) || 0) + 1);
    }
  });
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

export async function searchMenuItems(query: string): Promise<MenuItem[]> {
  const items = await getAvailableMenuItems();
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  );
}