export const CITATION_PATTERN_SOURCE = String.raw`\b(C\d{3}-[A-Z0-9]+):L(\d+)(?:\s*[\u2013-]\s*L?(\d+))?`;

export function parseCitation(value) {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp(`^${CITATION_PATTERN_SOURCE}$`));
  if (!match) return null;
  const start = Number(match[2]);
  const end = Number(match[3] ?? match[2]);
  return { ref: match[1], start: Math.min(start, end), end: Math.max(start, end) };
}

export function citationsInText(value) {
  if (typeof value !== "string") return [];
  return [...value.matchAll(new RegExp(CITATION_PATTERN_SOURCE, "g"))].map((match) => {
    const start = Number(match[2]);
    const end = Number(match[3] ?? match[2]);
    return { raw: match[0], ref: match[1], start: Math.min(start, end), end: Math.max(start, end) };
  });
}

export function citationIsRepresented(citation, evidence) {
  return evidence.some((candidate) => candidate.ref === citation.ref
    && candidate.start <= citation.start
    && candidate.end >= citation.end);
}

export function digestEvidenceCitations(digest) {
  const strings = [];
  const visit = (value, key = "") => {
    if (key === "sources_read") return;
    if (typeof value === "string") strings.push(value);
    else if (Array.isArray(value)) value.forEach((entry) => visit(entry, key));
    else if (value && typeof value === "object") {
      Object.entries(value).forEach(([childKey, child]) => visit(child, childKey));
    }
  };
  visit(digest);
  return strings.flatMap(citationsInText);
}

export function parseDeclaredLines(value) {
  if (typeof value !== "string") return [];
  return value.split(",").map((part) => {
    const match = part.trim().match(/^(\d+)\s*[-\u2013]\s*(\d+)$/);
    return match ? { start: Number(match[1]), end: Number(match[2]) } : null;
  }).filter(Boolean);
}
