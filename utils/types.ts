import { HERO_ICONS_OPTIONS } from './HERO_ICONS_OPTIONS';

export type IconType = (typeof HERO_ICONS_OPTIONS)[number];

export type CommunePolygons = {
  name: string;
  shape: { lat: number; lng: number }[];
}[];
