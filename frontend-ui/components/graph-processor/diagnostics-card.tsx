"use client";

import { GlassCard } from "./glass-card";
import { AlertTriangle, Copy } from "lucide-react";
import type { Diagnostics } from "./types";

interface DiagnosticsCardProps {
  diagnostics: Diagnostics;
}

export function DiagnosticsCard({ diagnostics }: DiagnosticsCardProps) {
  const hasInvalid = diagnostics.invalid_entries.length > 0;
  const hasDuplicates = diagnostics.duplicate_edges.length > 0;

  return (
    <GlassCard delay={400}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        Diagnostics
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-white/80">
              Invalid Entries
            </span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
              {diagnostics.invalid_entries.length}
            </span>
          </div>
          {hasInvalid ? (
            <div className="space-y-1">
              {diagnostics.invalid_entries.map((entry, index) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-mono"
                >
                  {entry}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm pl-6">No invalid entries</p>
          )}
        </div>

        <div className="h-px bg-white/10" />

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Copy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white/80">
              Duplicate Edges
            </span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
              {diagnostics.duplicate_edges.length}
            </span>
          </div>
          {hasDuplicates ? (
            <div className="space-y-1">
              {diagnostics.duplicate_edges.map((edge, index) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-mono"
                >
                  {edge}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm pl-6">No duplicate edges</p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
