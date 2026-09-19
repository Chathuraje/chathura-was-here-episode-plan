export function resolveBriefSourceIdeas<T extends { id: string }>(
  ideaIds: string[],
  allIdeas: T[],
): ({ presentation_role: "primary" | "linked"; idea: T } | null)[];
