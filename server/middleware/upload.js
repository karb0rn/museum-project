import fs from "fs";
import multer from "multer";
import path from "path";

// Ensure folders exist
const imageDir = "uploads/images";
const modelDir = "uploads/models";

fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(modelDir, { recursive: true });

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, imageDir);
    } else if (file.fieldname === "model") {
      cb(null, modelDir);
    }
  },

  filename: (req, file, cb) => {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      unique + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {

  if (file.fieldname === "image") {

    if (
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }

  } else if (file.fieldname === "model") {

    const ext = path.extname(file.originalname);

    if (
      ext === ".glb" ||
      ext === ".gltf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only GLB/GLTF models allowed"));
    }

  }
};

export default multer({
  storage,
  fileFilter
});