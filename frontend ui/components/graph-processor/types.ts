export interface UserInfo {
  user_id: string;
  email_id: string;
  college_roll_number: string;
}

export type TreeNode = Record<string, TreeNode>;

export interface Hierarchy {
  root: string;
  tree: TreeNode;
  depth?: number;
  has_cycle?: boolean;
}

export interface Diagnostics {
  invalid_entries: string[];
  duplicate_edges: string[];
}

export interface Summary {
  total_trees: number;
  total_cycles: number;
  largest_tree_root: string;
}

export interface GraphProcessorResponse {
  user_id: string;
  email_id: string;
  college_roll_number: string;
  hierarchies: Hierarchy[];
  invalid_entries: string[];
  duplicate_edges: string[];
  summary: Summary;
}
