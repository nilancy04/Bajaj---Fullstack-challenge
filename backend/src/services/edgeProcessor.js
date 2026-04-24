import { isValidEdgeFormat, normalizeEdge } from "../utils/validators.js";

export const processEdges = (rawData) => {
  const invalid_entries = [];
  const duplicate_edges = [];
  const duplicateTracker = new Set();
  const seenEdges = new Set();
  const childToParent = new Map();
  const adjacency = new Map();
  const nodes = new Set();

  for (const rawEntry of rawData) {
    if (!isValidEdgeFormat(rawEntry)) {
      invalid_entries.push(rawEntry);
      continue;
    }

    const edge = normalizeEdge(rawEntry);
    const [parent, child] = edge.split("->");

    if (seenEdges.has(edge)) {
      if (!duplicateTracker.has(edge)) {
        duplicate_edges.push(edge);
        duplicateTracker.add(edge);
      }
      continue;
    }
    seenEdges.add(edge);

    nodes.add(parent);
    nodes.add(child);

    if (!childToParent.has(child)) {
      childToParent.set(child, parent);
      if (!adjacency.has(parent)) adjacency.set(parent, []);
      adjacency.get(parent).push(child);
      if (!adjacency.has(child)) adjacency.set(child, []);
    }
  }

  return {
    invalid_entries,
    duplicate_edges,
    childToParent,
    adjacency,
    nodes
  };
};
