// Tiny, dependency-free unique id generator. Time-prefixed so list ordering
// stays roughly chronological, suffixed with random bits so writes on the
// same millisecond don't collide.

export const newId = (): string => {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `${t}-${r}`;
};
