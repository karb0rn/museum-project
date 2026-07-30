import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.join(__dirname, "../temp");

// Create temp directory if it doesn't exist
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// ========================
// Storage
// ========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName);
  },
});

// ========================
// File Filter
// ========================
const imageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const modelExtensions = [".glb", ".gltf", ".ply"];

const fileFilter = (req, file, cb) => {
  // Image Upload
  if (file.fieldname === "image") {
    if (imageTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Only JPG, PNG and WEBP images are allowed."));
  }

  // 3D Model Upload
  if (file.fieldname === "model") {
    const extension = path.extname(file.originalname).toLowerCase();

    if (modelExtensions.includes(extension)) {
      return cb(null, true);
    }

    return cb(new Error("Only .glb, .gltf and .ply files are allowed."));
  }

  return cb(new Error("Invalid upload field."));
};

// ========================
// Export
// ========================
export default multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
    files: 2,
  },
});