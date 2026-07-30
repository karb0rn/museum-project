import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

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

    return cb(new Error("Only GLB, GLTF and PLY allowed."));
  }

  cb(new Error("Invalid field."));
};

export default multer({
  storage,
  fileFilter,
});