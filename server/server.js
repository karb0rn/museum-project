import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import artifactRoutes from "./routes/artifactRoutes.js";


// =====================================
// Resolve __dirname
// =====================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================================
// Load Environment Variables
// =====================================
const result = dotenv.config({
  path: path.join(__dirname, ".env"),
});

if (result.error) {
  console.error("❌ Failed to load .env");
  console.error(result.error);
  process.exit(1);
}

console.log("✅ .env loaded successfully");
console.log("Cloudinary Cloud:", process.env.CLOUDINARY_CLOUD_NAME);
console.log(
  "Supabase URL:",
  process.env.SUPABASE_URL ? "Loaded" : "Missing"
);
console.log(
  "Supabase Service Role:",
  process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing"
);

// =====================================
// Connect Database
// =====================================
connectDB();

// =====================================
// Express App
// =====================================
const app = express();

app.use(express.json());

// Routes
app.use("/api/artifacts", artifactRoutes);

// =====================================
// Start Server
// =====================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});