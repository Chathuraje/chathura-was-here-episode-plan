/** Coordinates are typed in by hand on an idea page, so everything here is parsing and checking. */

export type Coordinates = { lat: number; lng: number };

/** Roughly Sri Lanka. Used only to warn, never to reject: a film may be shot outside it. */
export const SRI_LANKA = { west: 79.4, east: 82.1, south: 5.7, north: 10.0 };

export const SRI_LANKA_CENTRE: Coordinates = { lat: 7.87, lng: 80.77 };

/**
 * Accepts "7.2906, 80.6337", "7.2906 80.6337" or a Google Maps URL/place link
 * containing an @lat,lng or ?q=lat,lng pair. Returns null when nothing parses.
 */
export function parseCoordinates(input: string): Coordinates | null {
  const text = input.trim();
  if (!text) return null;
  const pair = text.match(/(-?\d{1,3}(?:\.\d+)?)\s*[, ]\s*(-?\d{1,3}(?:\.\d+)?)/);
  if (!pair) return null;
  return toCoordinates(Number(pair[1]), Number(pair[2]));
}

export function toCoordinates(lat: number, lng: number): Coordinates | null {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) };
}

export function isInSriLanka({ lat, lng }: Coordinates): boolean {
  return lat >= SRI_LANKA.south && lat <= SRI_LANKA.north && lng >= SRI_LANKA.west && lng <= SRI_LANKA.east;
}

export function formatCoordinates({ lat, lng }: Coordinates): string {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

/** A plain Google Maps link, so a place is openable even when the embedded map has no API key. */
export function googleMapsUrl(point: Coordinates): string {
  return `https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}`;
}
