const artifactSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    museum: String,
    dynasty: String,
    material: String,
    period: String,
    description: String,

    image: {
      type: String,
      default: "",
    },

    model: {
      type: String,
      default: "",
    },

    likes: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Artifact = mongoose.model("Artifact", artifactSchema);

export default Artifact;