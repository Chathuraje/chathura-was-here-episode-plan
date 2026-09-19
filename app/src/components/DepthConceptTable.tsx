"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DepthStatus } from "@/lib/development";
import styles from "@/app/depth-map/depth-map.module.css";

export type DepthConceptRow = {
  conceptId: string;
  title: string;
  groupId: string;
  episodeIds: string[];
  status: DepthStatus;
  note: string;
};

const statusLabels: Record<DepthStatus, string> = {
  missing: "Missing",
  surface_only: "Surface only",
  introduced: "Introduced",
  built: "Built",
  integrated: "Integrated",
  dangerously_compressed: "Dangerously compressed",
};

export default function DepthConceptTable({ rows }: { rows: DepthConceptRow[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return rows.filter((row) => {
      const matchesQuery = !needle || `${row.conceptId} ${row.title} ${row.note}`.toLocaleLowerCase().includes(needle);
      return matchesQuery && (group === "all" || row.groupId === group) && (status === "all" || row.status === status);
    });
  }, [group, query, rows, status]);

  return (
    <div>
      <div className={styles.filters}>
        <label>
          <span>Search concepts</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="ID, title, or analysis note" />
        </label>
        <label>
          <span>Group</span>
          <select value={group} onChange={(event) => setGroup(event.target.value)}>
            <option value="all">All groups</option>
            {Array.from(new Set(rows.map((row) => row.groupId))).map((groupId) => <option key={groupId}>{groupId}</option>)}
          </select>
        </label>
        <label>
          <span>Depth</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <strong className={styles.resultCount}>{filtered.length} / {rows.length}</strong>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.conceptTable}>
          <thead>
            <tr><th>Concept</th><th>Group</th><th>Episodes</th><th>Depth</th><th>Viewer-understanding note</th></tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.conceptId}>
                <td><Link href={`/concepts/${row.conceptId}`}><strong>{row.conceptId}</strong><span>{row.title}</span></Link></td>
                <td><Link href={`/arc/${row.groupId}`}>{row.groupId}</Link></td>
                <td className={styles.episodeLinks}>{row.episodeIds.map((id) => <Link href={`/episodes/${id}`} key={id}>{id.replace("EPD-", "")}</Link>)}</td>
                <td><span className={styles.statusChip} data-status={row.status}>{statusLabels[row.status]}</span></td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className={styles.noResults}>No concepts match these filters.</p>}
      </div>
    </div>
  );
}
