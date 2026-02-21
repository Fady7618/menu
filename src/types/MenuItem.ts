import type { BaseEntity } from "./BaseEntity";
import type { StrapiImage } from "./StrapiImage";

export interface MenuItemCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface MenuItem extends BaseEntity {
  name: string;
  description: string;
  price: number;
  image?: StrapiImage;
  isAvailable: boolean;
  category?: MenuItemCategory;
}