import Link from "next/link";
import { getData } from "@/lib/content";
import { docHref } from "@/lib/routes";

export default async function GroupsPage() {
  const d = await getData();
  return (
    <>
      <div className="kicker">04 · Story discovery</div>
      <h1>Overlap groups</h1>
      <p className="lede">
        Similar-looking cards and how research treats them: which card to start from, which travel with it, and which must stay separate.{" "}
        <Link href={docHref("content/04-story-discovery/overlap-map.md")}>Open the full overlap map</Link>.
      </p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Group</th><th>Theme</th><th>Lead</th><th>Supporting</th><th>Related, kept separate</th><th>Kind</th></tr></thead>
          <tbody>
            {[...d.groups.values()].map((g) => (
              <tr key={g.id}>
                <td><Link className="id-link" href={`/groups/${g.id}`}>{g.id}</Link></td>
                <td><Link href={`/groups/${g.id}`}>{g.theme}</Link></td>
                <td>{g.lead ? <Link className="id-link" href={`/ideas/${g.lead}`}>{g.lead}</Link> : "—"}</td>
                <td>{g.supporting.map((i) => <div key={i}><Link className="id-link" href={`/ideas/${i}`}>{i}</Link></div>)}</td>
                <td>{g.related.map((i) => <div key={i}><Link className="id-link" href={`/ideas/${i}`}>{i}</Link></div>)}</td>
                <td className="small muted">{g.kind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
