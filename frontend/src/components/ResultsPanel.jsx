import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FolderTree, UserRound } from "lucide-react";
import TreeView from "./TreeView.jsx";

const ResultsPanel = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 space-y-4"
    >
      <motion.section
        whileHover={{ y: -2 }}
        className="space-y-2 rounded-xl bg-white/10 p-4 shadow-md"
      >
        <div className="mb-1 flex items-center gap-2">
          <UserRound className="h-4 w-4 text-white" />
          <h3 className="text-white">User Info</h3>
        </div>
        <div className="space-y-2 text-sm text-white">
          <p><span className="text-gray-300">User ID:</span> {result.user_id}</p>
          <p><span className="text-gray-300">Email:</span> {result.email_id}</p>
          <p><span className="text-gray-300">Roll Number:</span> {result.college_roll_number}</p>
        </div>
      </motion.section>

      <motion.section
        whileHover={{ y: -2 }}
        className="space-y-2 rounded-xl bg-white/10 p-4 shadow-md"
      >
        <div className="mb-1 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-white" />
          <h3 className="text-white">Summary</h3>
        </div>
        <div className="grid gap-2 text-sm text-white sm:grid-cols-3">
          <p className="rounded-lg bg-white/10 p-3">Trees: {result.summary.total_trees}</p>
          <p className="rounded-lg bg-white/10 p-3">Cycles: {result.summary.total_cycles}</p>
          <p className="rounded-lg bg-white/10 p-3">Largest Root: {result.summary.largest_tree_root || "-"}</p>
        </div>
      </motion.section>

      <motion.section
        whileHover={{ y: -2 }}
        className="space-y-2 rounded-xl bg-white/10 p-4 shadow-md"
      >
        <div className="mb-1 flex items-center gap-2">
          <FolderTree className="h-4 w-4 text-white" />
          <h3 className="text-white">Hierarchies</h3>
        </div>
        <div className="space-y-3">
          {result.hierarchies.map((hierarchy, index) => (
            <motion.div
              key={`${hierarchy.root}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`rounded-xl p-4 ${
                hierarchy.has_cycle
                  ? "bg-red-500/20"
                  : "bg-emerald-500/20"
              }`}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-lg bg-white/20 px-2 py-1 font-semibold text-white">
                  Root: {hierarchy.root}
                </span>
                {hierarchy.has_cycle ? (
                  <span className="rounded-lg bg-red-500/30 px-2 py-1 font-medium text-white">
                    Cycle detected
                  </span>
                ) : (
                  <span className="rounded-lg bg-emerald-500/30 px-2 py-1 font-medium text-white">
                    Depth: {hierarchy.depth}
                  </span>
                )}
              </div>
              {hierarchy.has_cycle ? (
                <p className="text-sm text-white">Tree omitted due to cycle rule.</p>
              ) : (
                <TreeView tree={hierarchy.tree} />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        whileHover={{ y: -2 }}
        className="space-y-2 rounded-xl bg-white/10 p-4 shadow-md"
      >
        <div className="mb-1 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-white" />
          <h3 className="text-white">Diagnostics</h3>
        </div>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-amber-500/20 p-3 text-white">
            <p className="mb-2 font-semibold text-gray-200">Invalid Entries</p>
            <p className="text-white">{result.invalid_entries.length ? result.invalid_entries.join(", ") : "None"}</p>
          </div>
          <div className="rounded-xl bg-purple-500/20 p-3 text-white">
            <p className="mb-2 font-semibold text-gray-200">Duplicate Edges</p>
            <p className="text-white">{result.duplicate_edges.length ? result.duplicate_edges.join(", ") : "None"}</p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ResultsPanel;
