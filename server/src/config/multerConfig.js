import multer from "multer";
import path from "path";
import fs from "fs";
import { dirname } from "../utils/general-utils.js";

// Set up multer storage and filename
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const destination = path.join(
      dirname,
      "..",
      "..",
      "uploads",
      req.session.user_id.toString()
    );

    if (!fs.existsSync(destination))
      fs.mkdirSync(destination, { recursive: true });

    cb(null, destination);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // create a unique file name
  },
});

// const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;
