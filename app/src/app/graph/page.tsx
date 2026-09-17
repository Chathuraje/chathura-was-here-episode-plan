import { buildGraph } from "@/lib/graph";
import GraphExplorer from "./GraphExplorer";

export default async function GraphPage({ searchParams }: { searchParams: Promise<{ focus?: string }> }) {
  const { focus } = await searchParams;
  const graph = await buildGraph();
  return (
    <>
      <div className="kicker">Explore</div>
      <h1 style={{ marginBottom: 6 }}>Connection graph</h1>
      <p className="muted small" style={{ marginTop: 0 }}>
        Click a node to see its connections, right-click to open its page. Drag to rearrange, scroll to zoom.
      </p>
      <GraphExplorer nodes={graph.nodes} links={graph.links} initialFocus={focus} />
    </>
  );
}
