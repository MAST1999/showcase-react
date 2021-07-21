import { Router } from "express";
import multer from "multer";
import path from "path/posix";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ dest: "uploads", storage });

export const router = Router();

router.post("/new-data", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("How does it work?");
});

router.post("/file", upload.single("file"), (req, res) => {
  res.send(req.file);
});
