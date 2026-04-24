import express from "express";
import cors from "cors";
import bfhlRoutes from "./routes/bfhl.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/", bfhlRoutes);

app.use((err, _req, res, _next) => {
  res.status(500).json({
    error: "Unexpected server error.",
    details: err.message
  });
});

export default app;
