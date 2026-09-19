export function resolveBriefSourceIdeas(ideaIds, allIdeas) {
  const byId = new Map(allIdeas.map((idea) => [idea.id, idea]));
  return ideaIds.map((id, index) => {
    const idea = byId.get(id);
    if (!idea) return null;
    return { presentation_role: index === 0 ? "primary" : "linked", idea };
  });
}
