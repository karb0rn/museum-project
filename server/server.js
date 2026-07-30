import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import artifactRoutes from "./routes/artifactRoutes.js";

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// API Routes
app.use("/api/artifacts", artifactRoutes);

// Serve React build
app.use(express.static(path.join(__dirname, "../client/dist")));

// React Router fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});