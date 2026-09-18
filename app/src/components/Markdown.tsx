import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CONTENT_NAME, knownIds } from "@/lib/content";
import { docHref, hrefForId, routeForRepoPath } from "@/lib/routes";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ID_RE = /\b(SL-SQ\d{2}-\d{3}|ST-\d{3}|SEG-E(?:001|100A|100B)|CX-\d{3}|C\d{3}-I\d{2}|SQ\d{2}|C\d{3}|T\d{2}|G\d{2})\b/g;

/** Remark plugin: turn known IDs in plain text into links, and page-marker comments into visible markers. */
function remarkConnections(known: Set<string>) {
  return () => (tree: any) => {
    const walk = (node: any) => {
      if (!node.children) return;
      const next: any[] = [];
      for (const child of node.children) {
        if (child.type === "html") {
          const marker = String(child.value).match(/<!--\s*((?:pdf|page)[^>]*?)\s*-->/i);
          if (marker) next.push({ type: "inlineCode", value: `⟨${marker[1]}⟩`, data: { hProperties: { className: "page-marker" } } });
          continue; // drop other raw HTML
        }
        if (child.type === "text" && !["link", "linkReference", "heading"].includes(node.type)) {
          const value: string = child.value;
          let last = 0;
          let m: RegExpExecArray | null;
          ID_RE.lastIndex = 0;
          let split = false;
          while ((m = ID_RE.exec(value))) {
            if (!known.has(m[1])) continue;
            split = true;
            if (m.index > last) next.push({ type: "text", value: value.slice(last, m.index) });
            next.push({ type: "link", url: hrefForId(m[1]), children: [{ type: "text", value: m[1] }], data: { hProperties: { className: "id-link" } } });
            last = m.index + m[1].length;
          }
          if (split) {
            if (last < value.length) next.push({ type: "text", value: value.slice(last) });
            continue;
          }
        }
        if (child.type !== "link" && child.type !== "code" && child.type !== "inlineCode") walk(child);
        next.push(child);
      }
      node.children = next;
    };
    walk(tree);
  };
}

function resolveRelative(href: string, docPath: string): string {
  const [target, hash] = href.split("#");
  if (!target) return `#${hash ?? ""}`;
  const decoded = decodeURIComponent(target);
  const base = docPath.split("/").slice(0, -1);
  for (const part of decoded.split("/")) {
    if (part === "..") base.pop();
    else if (part !== "." && part !== "") base.push(part);
  }
  const route = routeForRepoPath(base.join("/"));
  return hash ? `${route}#${hash}` : route;
}

export default async function Markdown({ text, docPath }: { text: string; docPath?: string }) {
  const known = new Set(await knownIds());
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkConnections(known)]}
        components={{
          a: ({ href = "", children, className }) => {
            if (/^(https?:|mailto:)/.test(href)) {
              return (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              );
            }
            const to = href.startsWith("/") || href.startsWith("#") || !docPath ? href : resolveRelative(href, docPath);
            return (
              <Link href={to} className={className}>
                {children}
              </Link>
            );
          },
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
          code: ({ children, className }) => {
            const text = String(children);
            // Repo paths in inline code become links when they point at a Markdown file or folder we can open.
            if (!className && new RegExp(`^(${CONTENT_NAME}|content|instructions)/[^\`]+$`).test(text) && !text.includes("*") && !text.includes("<")) {
              return (
                <Link href={docHref(text.replace(/\/$/, ""))} className="code-link">
                  <code>{children}</code>
                </Link>
              );
            }
            return <code className={className}>{children}</code>;
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
