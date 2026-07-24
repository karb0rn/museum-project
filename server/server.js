import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/db.js";
import artifactRoutes from "./routes/artifactRoutes.js";
console.log("artifactRoutes imported:", artifactRoutes);

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/artifacts", artifactRoutes);
console.log("Artifact routes mounted");

// Home Route
app.get("/", (req, res) => {
  res.send("Virtual Museum API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});