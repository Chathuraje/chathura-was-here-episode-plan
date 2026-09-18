import { buildGraph } from "@/lib/graph";
import GraphExplorer from "./GraphExplorer";

export default async function GraphPage({ searchParams }: { searchParams: Promise<{ focus?: string; preset?: string }> }) {
  const { focus, preset } = await searchParams;
  const graph = await buildGraph();
  return (
    <>
      <div className="kicker">Explore</div>
      <h1 style={{ marginBottom: 6 }}>Connection graph</h1>
      <p className="muted small" style={{ marginTop: 0 }}>
        Click a node to see its connections, right-click to open its page, click a series connection line to read its basis. Drag to rearrange, scroll to zoom. Closeness in this layout is produced by the physics simulation and does not mean two things are meaningfully connected.
      </p>
      <GraphExplorer nodes={graph.nodes} links={graph.links} initialFocus={focus} initialPreset={preset ?? (focus?.startsWith("ST-") || focus?.startsWith("SEG-") ? "series" : undefined)} />
    </>
  );
}
