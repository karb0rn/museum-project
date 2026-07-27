import express from "express";
import upload from "../middleware/upload.js";

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

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "model",
      maxCount: 1
    }
  ]),
  createArtifact
);

router.put(
  "/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "model",
      maxCount: 1,
    },
  ]),
  updateArtifact
);

router.put("/:id/like", likeArtifact);
router.put("/:id/view", incrementViews);

router.delete("/:id", deleteArtifact);
export default router;