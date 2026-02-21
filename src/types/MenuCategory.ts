import type { BaseEntity } from "./BaseEntity";

export interface MenuCategory extends BaseEntity {
  name: string;
  slug: string;
}