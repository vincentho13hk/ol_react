export type Geometry = {
  type: string;
  coordinates: [number, number]
}

export type GeoJSON = {
  type: string;
  features: Feature[];
}

export type Feature = {
  type: string;
  geometry: Geometry;
  properties: any[];
}