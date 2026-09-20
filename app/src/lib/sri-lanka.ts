/**
 * A simplified map of Sri Lanka, used only to place and recognise locations at a
 * glance. The coastline is a hand-simplified outline traced through well-known
 * coastal points, not survey data: it is accurate enough to tell Jaffna from
 * Galle, and nowhere near accurate enough to navigate or plan access by.
 */

export type Coordinates = { lat: number; lng: number };

/** Map bounds, a little wider than the island so pins never touch the frame. */
export const BOUNDS = { west: 79.4, east: 82.1, south: 5.7, north: 10.0 };

export const VIEW = {
  width: Math.round((BOUNDS.east - BOUNDS.west) * 100),
  height: Math.round((BOUNDS.north - BOUNDS.south) * 100),
};

/** Longitude/latitude to SVG units. Equirectangular; over 4° of latitude the distortion is not visible. */
export function project({ lat, lng }: Coordinates): { x: number; y: number } {
  return { x: (lng - BOUNDS.west) * 100, y: (BOUNDS.north - lat) * 100 };
}

/** SVG units back to longitude/latitude, for clicks on the map. */
export function unproject(x: number, y: number): Coordinates {
  return {
    lat: Number((BOUNDS.north - y / 100).toFixed(4)),
    lng: Number((BOUNDS.west + x / 100).toFixed(4)),
  };
}

export function isOnIsland({ lat, lng }: Coordinates): boolean {
  return lat >= BOUNDS.south && lat <= BOUNDS.north && lng >= BOUNDS.west && lng <= BOUNDS.east;
}

/** Coastline, clockwise from Point Pedro. Simplified; see the note at the top of this file. */
const COASTLINE: Coordinates[] = [
  { lat: 9.83, lng: 80.21 }, { lat: 9.78, lng: 80.43 }, { lat: 9.60, lng: 80.45 },
  { lat: 9.38, lng: 80.65 }, { lat: 9.27, lng: 80.81 }, { lat: 9.05, lng: 80.98 },
  { lat: 8.88, lng: 81.05 }, { lat: 8.70, lng: 81.15 }, { lat: 8.57, lng: 81.24 },
  { lat: 8.47, lng: 81.32 }, { lat: 8.20, lng: 81.40 }, { lat: 7.95, lng: 81.55 },
  { lat: 7.72, lng: 81.70 }, { lat: 7.42, lng: 81.83 }, { lat: 7.10, lng: 81.86 },
  { lat: 6.84, lng: 81.83 }, { lat: 6.62, lng: 81.72 }, { lat: 6.35, lng: 81.50 },
  { lat: 6.22, lng: 81.33 }, { lat: 6.12, lng: 81.12 }, { lat: 6.06, lng: 80.95 },
  { lat: 6.02, lng: 80.79 }, { lat: 5.95, lng: 80.65 }, { lat: 5.92, lng: 80.59 },
  { lat: 5.97, lng: 80.42 }, { lat: 6.03, lng: 80.22 }, { lat: 6.14, lng: 80.10 },
  { lat: 6.35, lng: 80.00 }, { lat: 6.58, lng: 79.96 }, { lat: 6.93, lng: 79.84 },
  { lat: 7.21, lng: 79.84 }, { lat: 7.58, lng: 79.80 }, { lat: 7.85, lng: 79.75 },
  { lat: 8.03, lng: 79.83 }, { lat: 8.23, lng: 79.72 }, { lat: 8.38, lng: 79.85 },
  { lat: 8.55, lng: 79.95 }, { lat: 8.80, lng: 79.98 }, { lat: 9.05, lng: 80.00 },
  { lat: 9.25, lng: 80.05 }, { lat: 9.45, lng: 80.05 }, { lat: 9.58, lng: 79.95 },
  { lat: 9.70, lng: 79.88 }, { lat: 9.78, lng: 80.00 }, { lat: 9.80, lng: 80.10 },
];

export const ISLAND_PATH = COASTLINE
  .map((point, index) => {
    const { x, y } = project(point);
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(" ") + " Z";

/**
 * Rough centres of well-known towns, used only to label the map and to suggest a
 * region when a pin is dropped. Approximate to within a few kilometres.
 */
export const LANDMARKS: (Coordinates & { name: string; region: string })[] = [
  { name: "Jaffna", region: "Jaffna", lat: 9.66, lng: 80.02 },
  { name: "Mullaitivu", region: "Mullaitivu", lat: 9.27, lng: 80.81 },
  { name: "Vavuniya", region: "Vavuniya", lat: 8.75, lng: 80.50 },
  { name: "Mannar", region: "Mannar", lat: 8.98, lng: 79.92 },
  { name: "Trincomalee", region: "Trincomalee", lat: 8.57, lng: 81.23 },
  { name: "Anuradhapura", region: "Anuradhapura", lat: 8.31, lng: 80.41 },
  { name: "Puttalam", region: "Puttalam", lat: 8.03, lng: 79.83 },
  { name: "Polonnaruwa", region: "Polonnaruwa", lat: 7.94, lng: 81.00 },
  { name: "Batticaloa", region: "Batticaloa", lat: 7.72, lng: 81.70 },
  { name: "Kurunegala", region: "Kurunegala", lat: 7.49, lng: 80.36 },
  { name: "Kandy", region: "Kandy", lat: 7.29, lng: 80.64 },
  { name: "Negombo", region: "Gampaha", lat: 7.21, lng: 79.84 },
  { name: "Ampara", region: "Ampara", lat: 7.30, lng: 81.68 },
  { name: "Nuwara Eliya", region: "Nuwara Eliya", lat: 6.97, lng: 80.77 },
  { name: "Colombo", region: "Colombo", lat: 6.93, lng: 79.86 },
  { name: "Badulla", region: "Badulla", lat: 6.99, lng: 81.06 },
  { name: "Sri Pada", region: "Ratnapura–Nuwara Eliya", lat: 6.81, lng: 80.50 },
  { name: "Pottuvil", region: "Ampara", lat: 6.87, lng: 81.83 },
  { name: "Ratnapura", region: "Ratnapura", lat: 6.68, lng: 80.40 },
  { name: "Monaragala", region: "Monaragala", lat: 6.87, lng: 81.35 },
  { name: "Kalutara", region: "Kalutara", lat: 6.58, lng: 79.96 },
  { name: "Hambantota", region: "Hambantota", lat: 6.12, lng: 81.12 },
  { name: "Galle", region: "Galle", lat: 6.03, lng: 80.22 },
  { name: "Matara", region: "Matara", lat: 5.95, lng: 80.55 },
];

/** The nearest landmark to a dropped pin, offered only as a suggestion for the region field. */
export function nearestLandmark(point: Coordinates) {
  return LANDMARKS.reduce((closest, landmark) => {
    const distance = (landmark.lat - point.lat) ** 2 + (landmark.lng - point.lng) ** 2;
    return distance < closest.distance ? { landmark, distance } : closest;
  }, { landmark: LANDMARKS[0], distance: Number.POSITIVE_INFINITY }).landmark;
}
