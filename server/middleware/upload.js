import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, "../temp");

fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },

  filename: (req, file, cb) => {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      unique + path.extname(file.originalname).toLowerCase()
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    return cb(new Error("Only image files allowed."));
  }

  if (file.fieldname === "model") {
    const ext = path.extname(file.originalname).toLowerCase();

    if ([".glb", ".gltf", ".ply"].includes(ext)) {
      return cb(null, true);
    }

    return cb(new Error("Only GLB, GLTF and PLY files allowed."));
  }

  cb(new Error("Invalid upload field."));
};

export default multer({
  storage,
  fileFilter,
});