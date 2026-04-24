const getOrCreate = (map, key, fallback) => {
  if (!map.has(key)) map.set(key, fallback());
  return map.get(key);
};

const buildUndirectedGraph = (adjacency) => {
  const undirected = new Map();
  for (const [parent, children] of adjacency.entries()) {
    getOrCreate(undirected, parent, () => new Set());
    for (const child of children) {
      getOrCreate(undirected, child, () => new Set());
      undirected.get(parent).add(child);
      undirected.get(child).add(parent);
    }
  }
  return undirected;
};

const getConnectedComponents = (nodes, undirected) => {
  const visited = new Set();
  const components = [];

  for (const node of nodes) {
    if (visited.has(node)) continue;
    const stack = [node];
    const component = [];
    visited.add(node);

    while (stack.length > 0) {
      const current = stack.pop();
      component.push(current);
      const neighbors = undirected.get(current) || new Set();
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
    components.push(component.sort());
  }

  return components;
};

const hasCycleInComponent = (componentNodes, adjacency) => {
  const componentSet = new Set(componentNodes);
  const visiting = new Set();
  const visited = new Set();

  const dfs = (node) => {
    if (visiting.has(node)) return true;
    if (visited.has(node)) return false;

    visiting.add(node);
    const children = adjacency.get(node) || [];
    for (const child of children) {
      if (!componentSet.has(child)) continue;
      if (dfs(child)) return true;
    }
    visiting.delete(node);
    visited.add(node);
    return false;
  };

  for (const node of componentNodes) {
    if (dfs(node)) return true;
  }
  return false;
};

const detectRoot = (componentNodes, childToParent) => {
  const roots = componentNodes.filter((node) => !childToParent.has(node)).sort();
  if (roots.length > 0) return roots[0];
  return [...componentNodes].sort()[0];
};

const buildNodeObject = (node, adjacency) => {
  const children = (adjacency.get(node) || []).sort();
  const subtree = {};
  for (const child of children) {
    subtree[child] = buildNodeObject(child, adjacency);
  }
  return subtree;
};

const buildTreeFromRoot = (root, adjacency) => ({
  [root]: buildNodeObject(root, adjacency)
});

const calculateNodeDepth = (nodeObject) => {
  const childKeys = Object.keys(nodeObject);
  if (childKeys.length === 0) return 1;
  return 1 + Math.max(...childKeys.map((key) => calculateNodeDepth(nodeObject[key])));
};

export const buildHierarchies = ({ adjacency, nodes, childToParent }) => {
  const undirected = buildUndirectedGraph(adjacency);
  for (const node of nodes) {
    if (!undirected.has(node)) undirected.set(node, new Set());
  }

  const components = getConnectedComponents(nodes, undirected);
  const hierarchies = [];
  let total_trees = 0;
  let total_cycles = 0;
  let largestTree = { root: "", depth: -1 };

  for (const componentNodes of components) {
    const root = detectRoot(componentNodes, childToParent);
    const has_cycle = hasCycleInComponent(componentNodes, adjacency);

    if (has_cycle) {
      total_cycles += 1;
      hierarchies.push({
        root,
        tree: {},
        has_cycle: true
      });
      continue;
    }

    const tree = buildTreeFromRoot(root, adjacency);
    const depth = calculateNodeDepth(tree[root]);
    total_trees += 1;
    hierarchies.push({
      root,
      tree,
      depth
    });

    if (
      depth > largestTree.depth ||
      (depth === largestTree.depth && (largestTree.root === "" || root < largestTree.root))
    ) {
      largestTree = { root, depth };
    }
  }

  return {
    hierarchies,
    summary: {
      total_trees,
      total_cycles,
      largest_tree_root: largestTree.root
    }
  };
};
