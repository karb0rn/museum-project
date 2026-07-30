import fs from "fs/promises";
import cloudinary from "../config/cloudinary.js";
import Artifact from "../models/Artifact.js";

// =========================
// Helper
// =========================
const uploadToCloudinary = (filePath, folder, resourceType = "raw") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_large(
      filePath,
      {
        folder,
        resource_type: resourceType,
        chunk_size: 6000000, // 6 MB chunks
      }
    );

    stream.on("error", reject);

    stream.on("end", (result) => {
      resolve(result);
    });
  });
};

// =========================
// Get all artifacts
// =========================
export const getArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact.find();
    res.json(artifacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =========================
// Get one artifact
// =========================
export const getArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);

    if (!artifact) {
      return res.status(404).json({
        message: "Artifact not found",
      });
    }

    res.json(artifact);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// =========================
// Like
// =========================
export const likeArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!artifact) {
      return res.status(404).json({
        message: "Artifact not found",
      });
    }

    res.json(artifact);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// =========================
// Views
// =========================
export const incrementViews = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!artifact) {
      return res.status(404).json({
        message: "Artifact not found",
      });
    }

    res.json(artifact);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// =========================
// Create
// =========================
export const createArtifact = async (req, res) => {
  try {
    let image = "";
    let model = "";

    // Upload image
    if (req.files?.image?.[0]) {
      const result = await uploadToCloudinary(
        req.files.image[0].path,
        "museum/images"
      );

      image = result.secure_url;
    }

    // Upload model
    if (req.files?.model?.[0]) {
      const result = await uploadToCloudinary(
        req.files.model[0].path,
        "museum/models",
        "raw"
      );

      model = result.secure_url;
    }

    // Delete temp files
    if (req.files?.image?.[0]) {
      await fs.unlink(req.files.image[0].path);
    }

    if (req.files?.model?.[0]) {
      await fs.unlink(req.files.model[0].path);
    }

    const artifact = await Artifact.create({
      id: req.body.id,
      title: req.body.title,
      museum: req.body.museum,
      dynasty: req.body.dynasty,
      material: req.body.material,
      period: req.body.period,
      description: req.body.description,
      image,
      model,
      likes: 0,
      views: 0,
    });

    res.status(201).json(artifact);
  } catch (err) {
    console.error(err);

    // Cleanup if upload failed
    try {
      if (req.files?.image?.[0]) {
        await fs.unlink(req.files.image[0].path);
      }

      if (req.files?.model?.[0]) {
        await fs.unlink(req.files.model[0].path);
      }
    } catch { }

    res.status(500).json({
      message: err.message,
    });
  }
};

// =========================
// Update
// =========================
export const updateArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);

    if (!artifact) {
      return res.status(404).json({
        message: "Artifact not found",
      });
    }

    artifact.id = req.body.id;
    artifact.title = req.body.title;
    artifact.museum = req.body.museum;
    artifact.dynasty = req.body.dynasty;
    artifact.material = req.body.material;
    artifact.period = req.body.period;
    artifact.description = req.body.description;

    if (req.files?.image?.[0]) {
      const result = await uploadToCloudinary(
        req.files.image[0].path,
        "museum/images"
      );

      artifact.image = result.secure_url;

      await fs.unlink(req.files.image[0].path);
    }

    if (req.files?.model?.[0]) {
      const result = await uploadToCloudinary(
        req.files.model[0].path,
        "museum/models",
        "raw"
      );

      artifact.model = result.secure_url;

      await fs.unlink(req.files.model[0].path);
    }

    await artifact.save();

    res.json(artifact);
  } catch (err) {
    console.error(err);

    try {
      if (req.files?.image?.[0]) {
        await fs.unlink(req.files.image[0].path);
      }

      if (req.files?.model?.[0]) {
        await fs.unlink(req.files.model[0].path);
      }
    } catch { }

    res.status(500).json({
      message: err.message,
    });
  }
};

// =========================
// Delete
// =========================
export const deleteArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);

    if (!artifact) {
      return res.status(404).json({
        message: "Artifact not found",
      });
    }

    res.json({
      message: "Artifact deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};