import Artifact from "../models/Artifact.js";

// Get all artifacts
export const getArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact.find();
    res.json(artifacts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get a single artifact
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

// Like an artifact
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

// Increment artifact views
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
export const createArtifact = async (req, res) => {
  try {
    console.log("========== CREATE ARTIFACT ==========");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const image = req.files?.image
      ? `/uploads/images/${req.files.image[0].filename}`
      : "";

    const model = req.files?.model
      ? `/uploads/models/${req.files.model[0].filename}`
      : "";

    console.log("Image Path:", image);
    console.log("Model Path:", model);

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

    console.log("Artifact Saved");

    res.status(201).json(artifact);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
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

    if (req.files?.image) {
      artifact.image = `/uploads/images/${req.files.image[0].filename}`;
    }

    if (req.files?.model) {
      artifact.model = `/uploads/models/${req.files.model[0].filename}`;
    }

    await artifact.save();

    res.json(artifact);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message,
    });

  }
};
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