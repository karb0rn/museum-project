import mongoose from "mongoose";

const artifactSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: String,
  museum: String,
  dynasty: String,
  material: String,
  period: String,
  description: String,
  image: String,
  model: String,
  likes: Number,
  views: Number,
});

const Artifact = mongoose.model("Artifact", artifactSchema);

export default Artifact;