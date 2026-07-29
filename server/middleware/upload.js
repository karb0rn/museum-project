import fs from "fs";
import multer from "multer";
import path from "path";

// Ensure folders exist
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");

const imageDir = path.join(uploadDir, "images");
const modelDir = path.join(uploadDir, "models");

fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(modelDir, { recursive: true });

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Receiving:", file.originalname);
    console.log("Field:", file.fieldname);

    if (file.fieldname === "image") {
      console.log("Saving image to:", imageDir);
      cb(null, imageDir);
    } else if (file.fieldname === "model") {
      console.log("Saving model to:", modelDir);
      cb(null, modelDir);
    }
  },

  filename: (req, file, cb) => {
    const filename =
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname).toLowerCase();

    console.log("Filename:", filename);

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  } else if (file.fieldname === "model") {
    const ext = path.extname(file.originalname).toLowerCase();

    if ([".glb", ".gltf", ".ply"].includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only .glb, .gltf and .ply model files are allowed."
        )
      );
    }
  } else {
    cb(new Error("Invalid upload field."));
  }
};

export default multer({
  storage,
  fileFilter,
});