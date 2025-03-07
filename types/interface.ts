import { ImageURISource } from "react-native";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Data {
  pois_count: number;
  coordinates: String;
  pois: any;
  events: any;
}

export interface MapProps {
  coordinates: Coordinate[];
  marker: any;
  event: any;
}
export interface POI {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface StoreState {
  data: any;
  pois: any;
  init: () => void;
  coordinates: string;
}

export interface CategoryIcon {
  url: string;
}

export interface Marker {
  url: ImageURISource;
}

export interface Category {
  icon: CategoryIcon;
  marker: Marker;
}

export interface Audio {
  url: string;
}

export interface ImageInterface {
  url: string;
}

export interface Site {
  id: number;
  name: string;
  description: string;
  likes_count: number;
  latitude: number;
  longitude: number;
  category: Category;
  audio: Audio;
  gallery_images: ImageInterface[];
}

export interface DinamicIconProps {
  url: string;
}

export interface MarkerIconProps{
  color?: string
}