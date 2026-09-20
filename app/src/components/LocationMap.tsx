"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ISLAND_PATH,
  LANDMARKS,
  VIEW,
  nearestLandmark,
  project,
  unproject,
  type Coordinates,
} from "@/lib/sri-lanka";
import styles from "./LocationMap.module.css";

export type MapPin = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  ideaCount: number;
};

type Props = {
  pins: MapPin[];
  unplaced: { id: string; name: string }[];
  createLocation: (formData: FormData) => Promise<void>;
  placeLocation: (formData: FormData) => Promise<void>;
};

export default function LocationMap({ pins, unplaced, createLocation, placeLocation }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [picked, setPicked] = useState<Coordinates | null>(null);
  const [active, setActive] = useState<string | null>(null);

  function pick(event: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const box = svg.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * VIEW.width;
    const y = ((event.clientY - box.top) / box.height) * VIEW.height;
    setPicked(unproject(x, y));
  }

  const suggestion = picked ? nearestLandmark(picked) : null;

  return (
    <div className={styles.layout}>
      <figure className={styles.mapFigure}>
        <svg
          ref={svgRef}
          className={styles.map}
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          role="img"
          aria-label={`Map of Sri Lanka with ${pins.length} saved location${pins.length === 1 ? "" : "s"}. Click the map to pick coordinates.`}
          onClick={pick}
        >
          <path className={styles.island} d={ISLAND_PATH} />

          {LANDMARKS.map((landmark) => {
            const { x, y } = project(landmark);
            return (
              <g className={styles.landmark} key={landmark.name}>
                <circle cx={x} cy={y} r={1.8} />
                <text x={x + 4} y={y + 2.4}>{landmark.name}</text>
              </g>
            );
          })}

          {pins.map((pin) => {
            const { x, y } = project(pin);
            const isActive = active === pin.id;
            return (
              <g
                className={styles.pin}
                key={pin.id}
                data-active={isActive || undefined}
                onMouseEnter={() => setActive(pin.id)}
                onMouseLeave={() => setActive((current) => (current === pin.id ? null : current))}
              >
                <circle cx={x} cy={y} r={isActive ? 7 : 5} />
                <text x={x} y={y + 2.6}>{pin.ideaCount || ""}</text>
                <title>{pin.name}{pin.region ? `, ${pin.region}` : ""} — {pin.ideaCount} idea{pin.ideaCount === 1 ? "" : "s"}</title>
              </g>
            );
          })}

          {picked && (
            <g className={styles.picked}>
              <circle cx={project(picked).x} cy={project(picked).y} r={6} />
              <circle cx={project(picked).x} cy={project(picked).y} r={11} />
            </g>
          )}
        </svg>
        <figcaption className={styles.caption}>
          Simplified outline for orientation only. It is not survey-accurate and verifies nothing about access or permissions.
        </figcaption>
      </figure>

      <div className={styles.side}>
        {pins.length > 0 && (
          <section className={styles.panel}>
            <h3>On the map</h3>
            <ul className={styles.pinList}>
              {pins.map((pin) => (
                <li key={pin.id} data-active={active === pin.id || undefined} onMouseEnter={() => setActive(pin.id)} onMouseLeave={() => setActive(null)}>
                  <Link href={`#${pin.id}`}>{pin.name}</Link>
                  <small>{pin.region || "no region"} · {pin.ideaCount} idea{pin.ideaCount === 1 ? "" : "s"}</small>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.panel}>
          <h3>{picked ? "Pin dropped" : "Click the map"}</h3>
          {picked ? (
            <p className={styles.picked_readout}>
              {picked.lat.toFixed(3)}° N, {picked.lng.toFixed(3)}° E
              {suggestion ? <><br /><small>nearest landmark: {suggestion.name}</small></> : null}
            </p>
          ) : (
            <p className="panel-note">Click anywhere on the island to pick coordinates, then save them as a new location or move an existing one there.</p>
          )}

          <form action={createLocation} className="location-form">
            <input type="hidden" name="lat" value={picked?.lat ?? ""} />
            <input type="hidden" name="lng" value={picked?.lng ?? ""} />
            <label>Location name<input name="name" placeholder="e.g. Sri Pada / Adam&apos;s Peak" required /></label>
            <label>Region or district<input name="region" defaultValue="" key={suggestion?.region ?? "none"} placeholder={suggestion ? suggestion.region : "e.g. Kandy"} /></label>
            <label>Note<textarea name="note" rows={2} placeholder="Access, season, who to ask (optional)" /></label>
            <button className="button primary" type="submit">
              {picked ? "Save location here" : "Save location without a pin"}
            </button>
          </form>

          {unplaced.length > 0 && picked && (
            <form action={placeLocation} className="location-form">
              <input type="hidden" name="lat" value={picked.lat} />
              <input type="hidden" name="lng" value={picked.lng} />
              <label>
                Or move a saved location here
                <select name="location_id" required defaultValue="">
                  <option value="" disabled>Choose a location…</option>
                  {unplaced.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
                </select>
              </label>
              <button className="button subtle" type="submit">Pin it here</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
