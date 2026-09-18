import { buildIdeaBrief, briefToMarkdown } from "@/lib/brief";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const brief = await buildIdeaBrief((await params).id.toUpperCase());
  if (!brief) return Response.json({ error: "Idea not found" }, { status: 404 });
  if (new URL(request.url).searchParams.get("format") === "md") {
    return new Response(briefToMarkdown(brief), { headers: { "content-type": "text/markdown; charset=utf-8" } });
  }
  return Response.json(brief);
}
