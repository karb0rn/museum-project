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
    const artifact = new Artifact(req.body);

    const savedArtifact = await artifact.save();

    res.status(201).json(savedArtifact);
  } catch (err) {
    res.status(400).json({
      message: err.message,
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