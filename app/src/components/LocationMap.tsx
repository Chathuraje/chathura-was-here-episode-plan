"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SRI_LANKA_CENTRE, formatCoordinates, googleMapsUrl } from "@/lib/geo";
import styles from "./LocationMap.module.css";

export type MapPin = {
  id: string;
  name: string;
  region: string;
  note: string;
  lat: number;
  lng: number;
  ideas: { id: string; title: string }[];
};

type MapsGlobal = {
  maps: {
    Map: new (element: HTMLElement, options: Record<string, unknown>) => GoogleMap;
    Marker: new (options: Record<string, unknown>) => GoogleMarker;
    InfoWindow: new (options: Record<string, unknown>) => GoogleInfoWindow;
    LatLngBounds: new () => GoogleBounds;
  };
};
type GoogleMap = { fitBounds: (bounds: GoogleBounds, padding?: number) => void; setCenter: (p: unknown) => void; setZoom: (z: number) => void; panTo: (p: unknown) => void };
type GoogleMarker = { addListener: (event: string, handler: () => void) => void; setMap: (map: GoogleMap | null) => void; getPosition: () => unknown };
type GoogleInfoWindow = { setContent: (html: string) => void; open: (options: { map: GoogleMap; anchor: GoogleMarker }) => void; close: () => void };
type GoogleBounds = { extend: (point: { lat: number; lng: number }) => void };

declare global {
  interface Window { google?: MapsGlobal; __cwhMapsPromise?: Promise<void> }
}

/** Loads the Google Maps JS API once per page, however many maps ask for it. */
function loadMaps(apiKey: string): Promise<void> {
  if (window.google?.maps) return Promise.resolve();
  if (window.__cwhMapsPromise) return window.__cwhMapsPromise;
  window.__cwhMapsPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });
  return window.__cwhMapsPromise;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character] as string));
}

export default function LocationMap({ pins, apiKey }: { pins: MapPin[]; apiKey: string }) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<GoogleMap | null>(null);
  const markersRef = useRef<Map<string, GoogleMarker>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!apiKey || !container.current) return;
    let cancelled = false;

    loadMaps(apiKey)
      .then(() => {
        if (cancelled || !container.current || !window.google) return;
        const maps = window.google.maps;
        const map = new maps.Map(container.current, {
          center: SRI_LANKA_CENTRE,
          zoom: 7,
          mapTypeId: "terrain",
          mapTypeControl: true,
          streetViewControl: false,
        });
        mapRef.current = map;
        const info = new maps.InfoWindow({});
        const bounds = new maps.LatLngBounds();

        for (const pin of pins) {
          const marker = new maps.Marker({ position: { lat: pin.lat, lng: pin.lng }, map, title: pin.name });
          marker.addListener("click", () => {
            info.setContent(`<div class="${styles.infoWindow}">
              <strong>${escapeHtml(pin.name)}</strong>
              ${pin.region ? `<div>${escapeHtml(pin.region)}</div>` : ""}
              <div>${pin.ideas.map((idea) => `<a href="/ideas/${idea.id}">${escapeHtml(idea.id)}</a>`).join(" ")}</div>
            </div>`);
            info.open({ map, anchor: marker });
          });
          markersRef.current.set(pin.id, marker);
          bounds.extend({ lat: pin.lat, lng: pin.lng });
        }

        if (pins.length > 1) map.fitBounds(bounds, 60);
        else if (pins.length === 1) { map.setCenter({ lat: pins[0].lat, lng: pins[0].lng }); map.setZoom(11); }
        setReady(true);
      })
      .catch(() => { if (!cancelled) setError("Google Maps could not be loaded. Check the API key and its referrer restrictions."); });

    const markers = markersRef.current;
    return () => {
      cancelled = true;
      for (const marker of markers.values()) marker.setMap(null);
      markers.clear();
    };
  }, [apiKey, pins]);

  function focus(pin: MapPin) {
    const map = mapRef.current;
    if (!map) return;
    map.panTo({ lat: pin.lat, lng: pin.lng });
    map.setZoom(12);
  }

  if (!apiKey) {
    return (
      <div className={styles.fallback}>
        <h3>Map not configured</h3>
        <p>
          Set <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in <code>app/.env.local</code> and restart the dev server to see
          these places on a Google map. Everything below works without it.
        </p>
        <PinList pins={pins} />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.mapWrap}>
        <div ref={container} className={styles.map} role="application" aria-label="Map of the saved locations" />
        {error && <p className={styles.mapError}>{error}</p>}
        {!ready && !error && <p className={styles.mapLoading}>Loading the map…</p>}
      </div>
      <div className={styles.side}>
        <PinList pins={pins} onFocus={ready ? focus : undefined} />
      </div>
    </div>
  );
}

function PinList({ pins, onFocus }: { pins: MapPin[]; onFocus?: (pin: MapPin) => void }) {
  if (pins.length === 0) {
    return <p className="panel-note">No location has coordinates yet. Add them on the idea that uses the place.</p>;
  }
  return (
    <ul className={styles.pinList}>
      {pins.map((pin) => (
        <li key={pin.id}>
          <div className={styles.pinHead}>
            {onFocus
              ? <button type="button" className={styles.pinButton} onClick={() => onFocus(pin)}>{pin.name}</button>
              : <strong>{pin.name}</strong>}
            <a href={googleMapsUrl(pin)} target="_blank" rel="noreferrer" className="small-link">open ↗</a>
          </div>
          <small>{pin.region || "no region"} · {formatCoordinates(pin)}</small>
          <div className="chip-list">
            {pin.ideas.map((idea) => <Link key={idea.id} href={`/ideas/${idea.id}`} title={idea.title}>{idea.id}</Link>)}
          </div>
        </li>
      ))}
    </ul>
  );
}
