"use client";

import { GlassCard } from "./glass-card";
import { Globe, Network } from "lucide-react";

interface InputSectionProps {
  apiUrl: string;
  edges: string;
  setEdges: (input: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function InputSection({
  apiUrl,
  edges,
  setEdges,
  onSubmit,
  isLoading,
}: InputSectionProps) {
  return (
    <GlassCard delay={100}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            API URL
          </label>
          <input
            type="url"
            value={apiUrl}
            readOnly
            placeholder="http://localhost:5000/bfhl"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80 flex items-center gap-2">
            <Network className="w-4 h-4" />
            Edges Input
          </label>
          <textarea
            value={edges}
            onChange={(e) => setEdges(e.target.value)}
            placeholder="A->B, A->C, B->D"
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 resize-none"
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Process Graph"
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </GlassCard>
  );
}
