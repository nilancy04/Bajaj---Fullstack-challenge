import { useState } from "react";
import { motion } from "framer-motion";
import ResultsPanel from "./components/ResultsPanel.jsx";

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/bfhl";

function App() {
  const [inputValue, setInputValue] = useState("A->B, A->C, B->D");
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const formatInput = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", ");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      data: inputValue
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Failed to fetch API response");
      }
      setResult(json);
    } catch (submitError) {
      setError(submitError.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-purple-900 px-4 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-lg"
      >
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">BFHL Graph Processor</h1>
            <p className="mt-2 text-gray-300">
              Build hierarchies from directed edges with cycle-aware analysis.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="apiUrl" className="mb-2 block text-sm font-medium text-white">
                API URL
              </label>
              <input
                id="apiUrl"
                type="url"
                value={apiUrl}
                onChange={(event) => setApiUrl(event.target.value)}
                required
                className="w-full rounded-lg bg-white/20 p-3 text-white placeholder:text-gray-300 outline-none ring-1 ring-white/30 transition focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="edges" className="mb-2 block text-sm font-medium text-white">
                Edges
              </label>
              <textarea
                id="edges"
                rows={6}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onBlur={() => setInputValue((prev) => formatInput(prev))}
                placeholder="A->B, A->C, B->D"
                required
                className="w-full rounded-lg bg-white/20 p-3 text-white placeholder:text-gray-300 outline-none ring-1 ring-white/30 transition focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Processing..." : "Submit"}
            </motion.button>
          </form>

          {error ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-red-500/20 px-4 py-3 text-sm font-medium text-white"
            >
              {error}
            </motion.p>
          ) : null}
        </motion.section>

        <ResultsPanel result={result} />
      </motion.div>
    </main>
  );
}

export default App;
