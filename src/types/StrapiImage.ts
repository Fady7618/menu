import type { ImageFormat } from "./ImageFormat";


export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}