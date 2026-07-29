import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import artifactRoutes from "./routes/artifactRoutes.js";

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Uploads folder
const uploadsPath = path.join(__dirname, "uploads");

console.log("Uploads Path:", uploadsPath);
console.log("Uploads Exists:", fs.existsSync(uploadsPath));

app.use("/uploads", express.static(uploadsPath));

// API Routes
app.use("/api/artifacts", artifactRoutes);

// React build
const distPath = path.join(__dirname, "../client/dist");

console.log("Dist Path:", distPath);
console.log("Dist Exists:", fs.existsSync(distPath));

app.use(express.static(distPath));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Debug uploaded models
const modelsPath = path.join(__dirname, "uploads/models");

console.log("Models Folder:", modelsPath);
console.log("Models Folder Exists:", fs.existsSync(modelsPath));

if (fs.existsSync(modelsPath)) {
  console.log("Models:", fs.readdirSync(modelsPath));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Catch unexpected errors
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});