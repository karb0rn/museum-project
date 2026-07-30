import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.js";
import artifactRoutes from "./routes/artifactRoutes.js";

// Load environment variables
dotenv.config();

// Database
connectDB();

// Express
const app = express();

app.use(express.json());

// Routes
app.use("/api/artifacts", artifactRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("Cloudinary:", process.env.CLOUDINARY_CLOUD_NAME ? "Loaded" : "Missing");
  console.log("Supabase URL:", process.env.SUPABASE_URL ? "Loaded" : "Missing");
  console.log(
    "Supabase Key:",
    process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing"
  );
});