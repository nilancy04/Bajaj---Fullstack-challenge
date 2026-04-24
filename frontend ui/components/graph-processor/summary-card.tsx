"use client";

import { GlassCard } from "./glass-card";
import { BarChart3, TreePine, RefreshCw, Crown } from "lucide-react";
import type { Summary } from "./types";

interface SummaryCardProps {
  summary: Summary;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <GlassCard delay={500}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-cyan-400" />
        Summary
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-white/60">Total Trees</span>
          </div>
          <p className="text-3xl font-bold text-white">{summary.total_trees}</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4 text-red-400" />
            <span className="text-xs text-white/60">Total Cycles</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {summary.total_cycles}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white/60">Largest Tree Root</span>
          </div>
          <p className="text-2xl font-bold text-white font-mono">
            {summary.largest_tree_root || "-"}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
