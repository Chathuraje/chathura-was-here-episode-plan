import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { reloadData } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Chathura Was Here - Episode development",
  description: "Browse the source library, concepts, and the episode story arc.",
};

const navigation = [
  { href: "/", label: "Overview" },
  { href: "/sources", label: "Sources", number: "01" },
  { href: "/concepts", label: "Concepts", number: "02" },
  { href: "/arc", label: "Story arc", number: "03" },
  { href: "/ideas", label: "Ideas", number: "04" },
  { href: "/chronology", label: "Chronology", number: "05" },
  { href: "/learning", label: "Learning path" },
  { href: "/depth-map", label: "Depth map" },
  { href: "/locations", label: "Locations", number: "06" },
  { href: "/release", label: "Release", number: "07" },
  { href: "/screenplays", label: "Screenplays", number: "08" },
  { href: "/search", label: "Search" },
  { href: "/docs", label: "File library" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <aside className="sidebar">
            <Link href="/" className="brand">Chathura Was Here</Link>
            <div className="brand-sub">Episode development</div>
            <nav className="nav" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span>{item.number ?? ""}</span>{item.label}
                </Link>
              ))}
            </nav>
            <form action={reloadData} className="reload-form">
              <button type="submit" className="button subtle">Reload files</button>
            </form>
          </aside>
          <main className="main">
            <div className="topbar">
              <form className="global-search" action="/search">
                <label className="sr-only" htmlFor="global-search">Search sources and concepts</label>
                <input id="global-search" name="q" type="search" placeholder="Search sources and concepts" />
                <button type="submit" className="button">Search</button>
              </form>
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
