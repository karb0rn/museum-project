import express from "express";
import {
  createArtifact,
  deleteArtifact,
  getArtifact,
  getArtifacts,
  incrementViews,
  likeArtifact,
  updateArtifact,
} from "../controllers/artifactController.js";

const router = express.Router();

router.get("/", getArtifacts);
router.get("/:id", getArtifact);

router.post("/", createArtifact);

router.put("/:id", updateArtifact);

router.put("/:id/like", likeArtifact);
router.put("/:id/view", incrementViews);

router.delete("/:id", deleteArtifact);
export default router;