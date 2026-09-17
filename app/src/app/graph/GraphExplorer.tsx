"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GLink, GNode, NodeType } from "@/lib/graph";
import { hrefForId } from "@/lib/routes";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

const TYPES: { type: NodeType; label: string; color: string }[] = [
  { type: "concept", label: "Concepts", color: "#a88445" },
  { type: "idea", label: "Ideas", color: "#3b7cc0" },
  { type: "territory", label: "Territories", color: "#c4553d" },
  { type: "group", label: "Overlap groups", color: "#7c5fbb" },
  { type: "shortlist", label: "Research questions", color: "#239a66" },
  { type: "lead", label: "Story leads", color: "#d68a14" },
];
const COLOR = Object.fromEntries(TYPES.map((t) => [t.type, t.color])) as Record<NodeType, string>;

const PRESETS: { key: string; label: string; types: NodeType[]; accepted: boolean }[] = [
  { key: "research", label: "Research map", types: ["territory", "idea", "shortlist", "lead"], accepted: true },
  { key: "sources", label: "Sources → ideas", types: ["concept", "idea"], accepted: false },
  { key: "overlaps", label: "Overlaps", types: ["idea", "group"], accepted: true },
  { key: "all", label: "Everything", types: ["concept", "idea", "territory", "group", "shortlist", "lead"], accepted: false },
];

export default function GraphExplorer({ nodes, links, initialFocus }: { nodes: GNode[]; links: GLink[]; initialFocus?: string }) {
  const router = useRouter();
  const fgRef = useRef<any>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [types, setTypes] = useState<NodeType[]>(PRESETS[0].types);
  const [acceptedOnly, setAcceptedOnly] = useState(true);
  const [focus, setFocus] = useState<string | undefined>(initialFocus);
  const [depth, setDepth] = useState(initialFocus ? 1 : 0);
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => { ro.disconnect(); mq.removeEventListener("change", onChange); };
  }, []);

  // When focusing a node whose type is hidden, show that type.
  useEffect(() => {
    const n = nodes.find((x) => x.id === initialFocus);
    if (n) {
      setTypes((t) => (t.includes(n.type) ? t : [...t, n.type]));
      if (n.type === "concept") setTypes((t) => (t.includes("concept") ? t : [...t, "concept"]));
    }
  }, [initialFocus, nodes]);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const adjacency = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const l of links) {
      if (!m.has(l.source)) m.set(l.source, new Set());
      if (!m.has(l.target)) m.set(l.target, new Set());
      m.get(l.source)!.add(l.target);
      m.get(l.target)!.add(l.source);
    }
    return m;
  }, [links]);

  const data = useMemo(() => {
    const visibleType = (n: GNode) =>
      types.includes(n.type) && (!acceptedOnly || n.type !== "idea" || n.sub?.startsWith("Tier") || n.sub === "Do not advance" || n.sub === "accepted for research");
    let keep = new Set(nodes.filter(visibleType).map((n) => n.id));
    if (focus && depth > 0 && byId.has(focus)) {
      const within = new Set([focus]);
      let frontier = [focus];
      for (let i = 0; i < depth; i++) {
        const next: string[] = [];
        for (const id of frontier) for (const nb of adjacency.get(id) ?? []) if (!within.has(nb)) { within.add(nb); next.push(nb); }
        frontier = next;
      }
      keep = new Set([...within].filter((id) => id === focus || keep.has(id)));
    }
    return {
      nodes: nodes.filter((n) => keep.has(n.id)).map((n) => ({ ...n })),
      links: links.filter((l) => keep.has(l.source) && keep.has(l.target)).map((l) => ({ ...l })),
    };
  }, [nodes, links, types, acceptedOnly, focus, depth, byId, adjacency]);

  const selected = focus ? byId.get(focus) : undefined;
  const neighbours = useMemo(() => {
    if (!focus) return [] as { node: GNode; kinds: string[] }[];
    const map = new Map<string, string[]>();
    for (const l of links) {
      if (l.source === focus) map.set(l.target, [...(map.get(l.target) ?? []), l.kind]);
      if (l.target === focus) map.set(l.source, [...(map.get(l.source) ?? []), l.kind]);
    }
    return [...map.entries()].map(([id, kinds]) => ({ node: byId.get(id)!, kinds })).filter((x) => x.node).sort((a, b) => a.node.type.localeCompare(b.node.type) || a.node.id.localeCompare(b.node.id));
  }, [focus, links, byId]);

  const highlight = useMemo(() => new Set(focus ? [focus, ...(adjacency.get(focus) ?? [])] : []), [focus, adjacency]);

  const centerOn = (id: string) => {
    const n = data.nodes.find((x) => x.id === id) as any;
    if (n && fgRef.current && n.x != null) {
      fgRef.current.centerAt(n.x, n.y, 600);
      fgRef.current.zoom(3, 600);
    }
  };

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const hit = nodes.find((n) => n.id.toLowerCase() === q) ?? nodes.find((n) => n.label.toLowerCase().includes(q));
    if (hit) {
      if (!types.includes(hit.type)) setTypes((t) => [...t, hit.type]);
      setFocus(hit.id);
      setTimeout(() => centerOn(hit.id), 400);
    }
  };

  const text = dark ? "#ece8e0" : "#1f1d1a";
  const faint = dark ? "rgba(236,232,224,0.12)" : "rgba(31,29,26,0.10)";

  return (
    <div className="graph-shell">
      <div className="graph-canvas" ref={boxRef}>
        <ForceGraph2D
          ref={fgRef}
          width={size.w}
          height={size.h}
          graphData={data}
          nodeId="id"
          cooldownTicks={120}
          nodeRelSize={4}
          linkColor={(l: any) => {
            const s = typeof l.source === "object" ? l.source.id : l.source;
            const t = typeof l.target === "object" ? l.target.id : l.target;
            return focus && (s === focus || t === focus) ? (dark ? "rgba(236,232,224,0.7)" : "rgba(31,29,26,0.55)") : faint;
          }}
          linkWidth={(l: any) => {
            const s = typeof l.source === "object" ? l.source.id : l.source;
            const t = typeof l.target === "object" ? l.target.id : l.target;
            return focus && (s === focus || t === focus) ? 1.6 : 0.6;
          }}
          linkLineDash={(l: any) => (/supporting|secondary|related|merged/.test(l.kind) ? [2, 2] : null)}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, scale: number) => {
            const dim = focus && !highlight.has(node.id);
            const r = node.size;
            ctx.globalAlpha = dim ? 0.18 : 1;
            ctx.beginPath();
            if (node.type === "territory" || node.type === "shortlist") {
              ctx.rect(node.x - r, node.y - r, r * 2, r * 2);
            } else if (node.type === "group") {
              ctx.moveTo(node.x, node.y - r * 1.2); ctx.lineTo(node.x + r * 1.2, node.y); ctx.lineTo(node.x, node.y + r * 1.2); ctx.lineTo(node.x - r * 1.2, node.y); ctx.closePath();
            } else {
              ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
            }
            ctx.fillStyle = COLOR[node.type as NodeType];
            ctx.fill();
            if (node.id === focus) { ctx.lineWidth = 2 / scale; ctx.strokeStyle = text; ctx.stroke(); }
            const showLabel = node.id === focus || (!dim && (scale > 2.2 || node.type === "territory" || (focus && highlight.has(node.id))));
            if (showLabel) {
              const fontSize = Math.max(10 / scale, 2.2);
              ctx.font = `${node.type === "territory" ? "600 " : ""}${fontSize}px system-ui, sans-serif`;
              ctx.fillStyle = text;
              ctx.textAlign = "center";
              ctx.textBaseline = "top";
              const label = node.type === "territory" || scale > 4 || node.id === focus ? `${node.id} ${node.label}` : node.id;
              ctx.fillText(label.length > 48 ? label.slice(0, 46) + "…" : label, node.x, node.y + r + 1.5);
            }
            ctx.globalAlpha = 1;
          }}
          nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size + 2, 0, 2 * Math.PI);
            ctx.fill();
          }}
          nodeLabel={(n: any) => `${n.id} — ${n.label}${n.sub ? ` (${n.sub})` : ""}`}
          onNodeClick={(n: any) => setFocus(n.id === focus ? undefined : n.id)}
          onNodeRightClick={(n: any) => router.push(hrefForId(n.id))}
          onBackgroundClick={() => setFocus(undefined)}
          onEngineStop={() => { if (initialFocus && focus === initialFocus) centerOn(initialFocus); }}
        />
      </div>

      <div className="graph-side">
        <section className="card">
          <form onSubmit={search} className="row" style={{ marginBottom: 10 }}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find ID or title" style={{ flex: 1 }} />
            <button type="submit">Find</button>
          </form>
          <div className="kicker">View</div>
          <div className="row" style={{ marginBottom: 10 }}>
            {PRESETS.map((p) => (
              <button key={p.key} className="small" onClick={() => { setTypes(p.types); setAcceptedOnly(p.accepted); }}>{p.label}</button>
            ))}
          </div>
          <div className="legend">
            {TYPES.map((t) => (
              <label key={t.type}>
                <input type="checkbox" checked={types.includes(t.type)} onChange={(e) => setTypes((cur) => (e.target.checked ? [...cur, t.type] : cur.filter((x) => x !== t.type)))} />
                <span className="dot" style={{ background: t.color }} /> {t.label}
              </label>
            ))}
          </div>
          <label className="small" style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <input type="checkbox" checked={acceptedOnly} onChange={(e) => setAcceptedOnly(e.target.checked)} /> Accepted ideas only (hide held and merged)
          </label>
          <p className="small muted" style={{ marginBottom: 0 }}>{data.nodes.length} nodes · {data.links.length} connections. Dashed lines are supporting, secondary, related or merged links.</p>
        </section>

        {selected ? (
          <section className="card">
            <div className="kicker">{selected.type}</div>
            <h3 style={{ margin: "0 0 4px" }}>{selected.id} — {selected.label}</h3>
            {selected.sub ? <div className="small muted">{selected.sub}</div> : null}
            <div className="row" style={{ margin: "10px 0" }}>
              <Link className="btn btn-primary" href={hrefForId(selected.id)}>Open page</Link>
              <label className="small">Show
                <select value={depth} onChange={(e) => setDepth(Number(e.target.value))} style={{ marginLeft: 6 }}>
                  <option value={0}>whole view</option>
                  <option value={1}>neighbours</option>
                  <option value={2}>2 steps</option>
                </select>
              </label>
            </div>
            <div className="kicker">Connections ({neighbours.length})</div>
            <div className="grid" style={{ gap: 4 }}>
              {neighbours.map(({ node, kinds }) => (
                <div key={node.id} className="small row" style={{ gap: 6, flexWrap: "nowrap" }}>
                  <span className="dot" style={{ background: COLOR[node.type] }} />
                  <button className="small" style={{ padding: "1px 6px" }} onClick={() => { if (!types.includes(node.type)) setTypes((t) => [...t, node.type]); setFocus(node.id); }}>{node.id}</button>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }} title={node.label}>{node.label}</span>
                  <span className="muted" style={{ whiteSpace: "nowrap" }}>{kinds[0]}</span>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="card small muted">Select a node to see how it connects. Right-click a node to jump straight to its page.</section>
        )}
      </div>
    </div>
  );
}
