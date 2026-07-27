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

    const image =
      req.files?.image
        ? `/uploads/images/${req.files.image[0].filename}`
        : "";

    const model =
      req.files?.model
        ? `/uploads/models/${req.files.model[0].filename}`
        : "";

    const artifact = await Artifact.create({
      title: req.body.title,
      museum: req.body.museum,
      dynasty: req.body.dynasty,
      century: req.body.century,
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
      message: err.message
    });
  }
};
export const updateArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!artifact) {
      return res.status(404).json({
        message: "Artifact not found",
      });
    }

    res.json(artifact);
  } catch (err) {
    res.status(400).json({
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