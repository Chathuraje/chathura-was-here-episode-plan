import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CONTENT_NAME, knownIds } from "@/lib/content";
import { docHref, hrefForId, routeForRepoPath } from "@/lib/routes";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ID_RE = /\bC\d{3}\b/g;

function remarkConceptLinks(known: Set<string>) {
  return () => (tree: any) => {
    const walk = (node: any) => {
      if (!node.children) return;
      const next: any[] = [];
      for (const child of node.children) {
        if (child.type === "html") {
          const marker = String(child.value).match(/<!--\s*((?:pdf|page)[^>]*?)\s*-->/i);
          if (marker) next.push({ type: "inlineCode", value: `[${marker[1]}]`, data: { hProperties: { className: "page-marker" } } });
          continue;
        }
        if (child.type === "text" && !["link", "linkReference", "heading"].includes(node.type)) {
          const value: string = child.value;
          let last = 0;
          let match: RegExpExecArray | null;
          let split = false;
          ID_RE.lastIndex = 0;
          while ((match = ID_RE.exec(value))) {
            if (!known.has(match[0])) continue;
            split = true;
            if (match.index > last) next.push({ type: "text", value: value.slice(last, match.index) });
            next.push({ type: "link", url: hrefForId(match[0]), children: [{ type: "text", value: match[0] }], data: { hProperties: { className: "id-link" } } });
            last = match.index + match[0].length;
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
  const base = docPath.split("/").slice(0, -1);
  for (const part of decodeURIComponent(target).split("/")) {
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
        remarkPlugins={[remarkGfm, remarkConceptLinks(known)]}
        components={{
          a: ({ href = "", children, className }) => {
            if (/^(https?:|mailto:)/.test(href)) return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
            const to = href.startsWith("/") || href.startsWith("#") || !docPath ? href : resolveRelative(href, docPath);
            return <Link href={to} className={className}>{children}</Link>;
          },
          table: ({ children }) => <div className="table-wrap"><table>{children}</table></div>,
          code: ({ children, className }) => {
            const value = String(children);
            if (!className && new RegExp(`^(${CONTENT_NAME}|content)/[^\u0060]+$`).test(value) && !value.includes("*") && !value.includes("<")) {
              return <Link href={docHref(value.replace(/\/$/, ""))} className="code-link"><code>{children}</code></Link>;
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
