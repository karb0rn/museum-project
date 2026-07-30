import fs from "fs/promises";
import path from "path";
import cloudinary from "../config/cloudinary.js";
import supabase from "../config/supabase.js";
import Artifact from "../models/Artifact.js";

// ==========================================
// Helpers
// ==========================================

const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "museum/images",
    resource_type: "image",
  });

  return result.secure_url;
};

const uploadModel = async (filePath) => {
  const fileName = `${Date.now()}-${path.basename(filePath)}`;

  const buffer = await fs.readFile(filePath);

  const { error } = await supabase.storage
    .from("models")
    .upload(fileName, buffer, {
      contentType: "model/gltf-binary",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("models")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

const cleanup = async (...files) => {
  for (const file of files) {
    if (!file) continue;

    try {
      await fs.unlink(file);
    } catch { }
  }
};

// ==========================================
// GET ALL
// ==========================================

export const getArtifacts = async (req, res) => {
  try {
    res.json(await Artifact.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================================
// GET ONE
// ==========================================

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
    res.status(500).json({ message: err.message });
  }
};

// ==========================================
// LIKE
// ==========================================

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
    res.status(500).json({ message: err.message });
  }
};

// ==========================================
// VIEW
// ==========================================

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
    res.status(500).json({ message: err.message });
  }
};

// ==========================================
// CREATE
// ==========================================

export const createArtifact = async (req, res) => {
  const imagePath = req.files?.image?.[0]?.path;
  const modelPath = req.files?.model?.[0]?.path;

  try {
    if (!imagePath) {
      return res.status(400).json({
        message: "Image is required.",
      });
    }

    const image = await uploadImage(imagePath);
    const model = modelPath
      ? await uploadModel(modelPath)
      : "";

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
    res.status(500).json({
      message: err.message,
    });
  } finally {
    await cleanup(imagePath, modelPath);
  }
};

// ==========================================
// UPDATE
// ==========================================

export const updateArtifact = async (req, res) => {
  const imagePath = req.files?.image?.[0]?.path;
  const modelPath = req.files?.model?.[0]?.path;

  try {
    const artifact = await Artifact.findById(req.params.id);

    if (!artifact) {
      return res.status(404).json({
        message: "Artifact not found",
      });
    }

    Object.assign(artifact, {
      id: req.body.id,
      title: req.body.title,
      museum: req.body.museum,
      dynasty: req.body.dynasty,
      material: req.body.material,
      period: req.body.period,
      description: req.body.description,
    });

    if (imagePath) {
      artifact.image = await uploadImage(imagePath);
    }

    if (modelPath) {
      artifact.model = await uploadModel(modelPath);
    }

    await artifact.save();

    res.json(artifact);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  } finally {
    await cleanup(imagePath, modelPath);
  }
};

// ==========================================
// DELETE
// ==========================================

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