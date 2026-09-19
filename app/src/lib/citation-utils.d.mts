export type ParsedCitation = { ref: string; start: number; end: number };
export type LocatedCitation = ParsedCitation & { raw: string };

export const CITATION_PATTERN_SOURCE: string;
export function parseCitation(value: unknown): ParsedCitation | null;
export function citationsInText(value: unknown): LocatedCitation[];
export function citationIsRepresented(citation: ParsedCitation, evidence: ParsedCitation[]): boolean;
export function digestEvidenceCitations(digest: unknown): LocatedCitation[];
export function parseDeclaredLines(value: unknown): { start: number; end: number }[];
