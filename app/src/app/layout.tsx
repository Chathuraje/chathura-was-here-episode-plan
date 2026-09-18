import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { reloadData } from "./actions";
import { spoilersHidden } from "@/lib/series";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Research Explorer — Chathura Was Here",
  description: "Explore the research pipeline from Abhidhamma sources to story leads.",
};

type NavGroup = { group: string; items: { href: string; label: string; num?: string; color?: string }[] };
const nav = (hide: boolean): NavGroup[] => [
  ...NAV.slice(0, 2),
  { group: "Series · Episodes 2–99", items: [
    { href: "/episodes", label: "Episodes", num: "06", color: "story" },
    { href: "/attention", label: "Needs attention", num: "06" },
    { href: "/series", label: "Release order", num: "06" },
    ...(hide ? [] : [{ href: "/series/chronology", label: "Hidden chronology", num: "06", color: "segment" }]),
    { href: "/series/connections", label: "Connections", num: "06" },
  ] },
  ...NAV.slice(2),
];

const NAV: NavGroup[] = [
  { group: "Explore", items: [
    { href: "/", label: "Overview" },
    { href: "/graph", label: "Connection graph" },
    { href: "/search", label: "Search" },
  ] },
  { group: "Pipeline", items: [
    { href: "/sources", label: "Sources", num: "01" },
    { href: "/concepts", label: "Concepts", num: "02", color: "concept" },
    { href: "/ideas", label: "Idea bank", num: "03", color: "idea" },
    { href: "/territories", label: "Territories", num: "04", color: "territory" },
    { href: "/groups", label: "Overlap groups", num: "04", color: "group" },
    { href: "/shortlist", label: "Research shortlist", num: "04", color: "shortlist" },
    { href: "/leads", label: "Story leads", num: "05", color: "lead" },
  ] },
  { group: "Files", items: [
    { href: "/docs", label: "Library (all files)" },
  ] },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <aside className="sidebar">
            <div className="brand">Chathura Was Here</div>
            <div className="brand-sub">Research explorer · Story → Place → Experience</div>
            <nav className="nav">
              {nav(spoilersHidden()).map((g) => (
                <div key={g.group}>
                  <div className="nav-group">{g.group}</div>
                  {g.items.map((i) => (
                    <Link key={i.href} href={i.href}>
                      <span className="num">{i.num ?? ""}</span>
                      {i.color ? <span className="dot" style={{ background: `var(--c-${i.color})` }} /> : null}
                      {i.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
            <form action={reloadData} style={{ marginTop: 20 }}>
              <button type="submit" className="small" title="Re-read all Markdown files from disk">↻ Reload files</button>
            </form>
          </aside>
          <main className="main">
            <div className="topbar">
              <form className="search" action="/search">
                <input name="q" placeholder="Search episodes, ideas, concepts, questions, leads… or type an ID (ST-007, C006-I01, SQ05)" aria-label="Search" />
                <button type="submit">Search</button>
              </form>
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
