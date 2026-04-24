"use client";

import { useState } from "react";
import { GlassCard } from "./glass-card";
import { InputSection } from "./input-section";
import { ResultsSection } from "./results-section";
import type { GraphProcessorResponse } from "./types";
import { Network, Sparkles } from "lucide-react";

const API_URL = "http://localhost:5000/bfhl";

export function GraphProcessor() {
  const [edges, setEdges] = useState("A->B, A->C, B->D");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GraphProcessorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!edges.trim()) {
      setError("Please provide edges input");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: edges.split(",").map((e) => e.trim()),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process graph.");
      }

      setResult(data);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Failed to process graph. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 animate-pulse-glow">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            BFHL Graph Processor
          </h1>
          <p className="text-lg text-white/60 max-w-md mx-auto flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Process hierarchical graph data from edge inputs
            <Sparkles className="w-4 h-4 text-purple-400" />
          </p>
        </header>

        {/* Input Section */}
        <InputSection
          apiUrl={API_URL}
          edges={edges}
          setEdges={setEdges}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Error Display */}
        {error && (
          <GlassCard className="border-red-500/30 bg-red-500/10">
            <p className="text-red-400 text-center">{error}</p>
          </GlassCard>
        )}

        {/* Results Section */}
        {result && <ResultsSection data={result} />}
      </div>
    </div>
  );
}
