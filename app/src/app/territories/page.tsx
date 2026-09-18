import Link from "next/link";
import { getData } from "@/lib/content";
import { docHref } from "@/lib/routes";

export default async function TerritoriesPage() {
  const d = await getData();
  const philosophyMap = [...d.territories.values()][0]?.file ?? "";
  return (
    <>
      <div className="kicker">04 · Story discovery</div>
      <h1>Human territories</h1>
      <p className="lede">
        {d.territories.size} families of human questions drawn from the accepted cards. A territory describes questions, never a type of person.{" "}
        <Link href={docHref(philosophyMap)}>Open the full philosophy map</Link>.
      </p>
      <div className="grid grid-2">
        {[...d.territories.values()].map((t) => {
          const tiers = t.primary.map((i) => d.ideas.get(i)?.score?.tier);
          return (
            <Link key={t.id} href={`/territories/${t.id}`} className="card card-link">
              <div className="kicker">{t.id}</div>
              <h3 style={{ margin: "0 0 6px" }}>{t.name}</h3>
              <p className="small" style={{ margin: "0 0 8px" }}>{t.definition}</p>
              <p className="small muted" style={{ margin: "0 0 10px" }}>{t.tension}</p>
              <div className="row small">
                <span>{t.primary.length} primary · {t.secondary.length} secondary</span>
                <span className="tier-a">A {tiers.filter((x) => x === "Tier A").length}</span>
                <span className="tier-b">B {tiers.filter((x) => x === "Tier B").length}</span>
                <span className="tier-c">C {tiers.filter((x) => x === "Tier C").length}</span>
              </div>
              <div className="chips" style={{ marginTop: 8 }}>
                {t.shortlist.map((sq) => <span key={sq} className="chip"><span className="dot" style={{ background: "var(--c-shortlist)" }} /><span className="id">{sq}</span></span>)}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
