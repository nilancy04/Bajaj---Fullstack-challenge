export const isValidEdgeFormat = (edge) => {
  if (typeof edge !== "string") return false;
  const trimmed = edge.trim();
  if (!trimmed) return false;
  if (!/^[A-Z]->[A-Z]$/.test(trimmed)) return false;

  const [parent, child] = trimmed.split("->");
  if (parent === child) return false;
  return true;
};

export const normalizeEdge = (edge) => edge.trim();
