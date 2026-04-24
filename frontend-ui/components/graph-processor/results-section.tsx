"use client";

import { UserInfoCard } from "./user-info-card";
import { HierarchiesCard } from "./hierarchies-card";
import { DiagnosticsCard } from "./diagnostics-card";
import { SummaryCard } from "./summary-card";
import type { GraphProcessorResponse } from "./types";

interface ResultsSectionProps {
  data: GraphProcessorResponse;
}

export function ResultsSection({ data }: ResultsSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserInfoCard
          userInfo={{
            user_id: data.user_id,
            email_id: data.email_id,
            college_roll_number: data.college_roll_number,
          }}
        />
        <SummaryCard summary={data.summary} />
      </div>
      <HierarchiesCard hierarchies={data.hierarchies} />
      <DiagnosticsCard
        diagnostics={{
          invalid_entries: data.invalid_entries,
          duplicate_edges: data.duplicate_edges,
        }}
      />
    </div>
  );
}
