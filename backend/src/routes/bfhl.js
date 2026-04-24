import express from "express";
import { identity, isValidCollegeEmail } from "../config/identity.js";
import { processEdges } from "../services/edgeProcessor.js";
import { buildHierarchies } from "../services/hierarchyBuilder.js";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.status(200).json({ message: "BFHL GET route working" });
});

router.post("/", (req, res) => {
  const { data } = req.body ?? {};

  if (!Array.isArray(data)) {
    return res.status(400).json({
      error: "Invalid payload. Expected { data: [] }."
    });
  }

  if (!isValidCollegeEmail(identity.email_id)) {
    return res.status(500).json({
      error: "Configured email_id is not a valid college email."
    });
  }

  const processed = processEdges(data);
  const { hierarchies, summary } = buildHierarchies(processed);

  return res.status(200).json({
    user_id: identity.user_id,
    email_id: identity.email_id,
    college_roll_number: identity.college_roll_number,
    hierarchies,
    invalid_entries: processed.invalid_entries,
    duplicate_edges: processed.duplicate_edges,
    summary
  });
});

export default router;
