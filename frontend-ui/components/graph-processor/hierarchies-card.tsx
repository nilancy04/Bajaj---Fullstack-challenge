"use client";

import { GlassCard } from "./glass-card";
import { GitBranch, ChevronRight } from "lucide-react";
import type { Hierarchy, TreeNode } from "./types";

interface HierarchiesCardProps {
  hierarchies: Hierarchy[];
}

function TreeNodeDisplay({
  tree,
  level = 0,
}: {
  tree: TreeNode;
  level?: number;
}) {
  const entries = Object.entries(tree || {});

  return (
    <div className="space-y-1 select-none">
      {entries.map(([name, childTree]) => (
        <div key={`${name}-${level}`}>
          <div
            className="flex items-center gap-1"
            style={{ paddingLeft: `${level * 16}px` }}
          >
            {level > 0 && (
              <ChevronRight className="w-3 h-3 text-white/30 shrink-0" />
            )}
            <span className="px-2 py-0.5 rounded text-sm font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {name}
            </span>
          </div>
          {Object.keys(childTree).length > 0 && (
            <div className="mt-1 space-y-1">
              <TreeNodeDisplay tree={childTree} level={level + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function HierarchiesCard({ hierarchies }: HierarchiesCardProps) {
  return (
    <GlassCard delay={300}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-emerald-400" />
        Hierarchies
      </h3>

      {hierarchies.length === 0 ? (
        <p className="text-white/50 text-sm">No hierarchies found</p>
      ) : (
        <div className="space-y-4">
          {hierarchies.map((hierarchy, index) => (
            <div
              key={`${hierarchy.root}-${index}`}
              className="p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-white/50">Root:</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-sm font-mono border border-indigo-500/30">
                  {hierarchy.root}
                </span>
                {hierarchy.has_cycle ? (
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-xs font-medium border border-red-500/30">
                    Cycle detected
                  </span>
                ) : null}
              </div>
              {hierarchy.has_cycle ? (
                <p className="text-sm text-red-300">Tree omitted due to cycle rule.</p>
              ) : (
                <TreeNodeDisplay tree={hierarchy.tree} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
        <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
        <span>Valid Node</span>
      </div>
    </GlassCard>
  );
}
