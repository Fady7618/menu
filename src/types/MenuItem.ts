// Raw row from Google Sheets CSV (column names must match exactly)
export interface MenuItemRaw {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  Category: string;
  Available: boolean | string;
  Image?: string;
}

// Processed item used throughout the app
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  imageUrl?: string;
  formattedPrice: string;
}