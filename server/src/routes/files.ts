import { Router } from "express";
import multer from "multer";
import path from "path";
import { File } from "../entity/File.js";
import { Info } from "../entity/Info.js";
import { User } from "../entity/User.js";

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

// GET
router.get("/files", async (req, res) => {
  try {
    const files = await File.find({ relations: ["user"] });

    return res.send(files);
  } catch (err) {
    const errObj = {
      err,
      place: `/files`,
      method: "GET",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

router.get("/file/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const file = await File.findOneOrFail({ uuid }, { relations: ["user"] });

    return res.send(file);
  } catch (err) {
    const errObj = {
      err,
      place: `/file`,
      method: "GET",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

// POST
router.post("/file", upload.single("file"), async (req, res) => {
  const { userUuid, infoUuid } = req.body;
  const filename = req.file?.filename;
  const link = `http://localhost:5000/uploads/${filename}`;

  try {
    const user = await User.findOneOrFail({ uuid: userUuid });
    const info = await Info.findOneOrFail({ uuid: infoUuid });

    const file = new File({ filename, link, user, info });

    await file.save();

    return res.send({ message: "file uploaded successfully", file });
  } catch (err) {
    const errObj = {
      err,
      place: `/file`,
      method: "POST",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

router.post("/files", upload.array("files", 10), async (req, res) => {
  const { userUuid } = req.body;
  if (req.files && Array.isArray(req.files)) {
    try {
      for (const file of req.files) {
        const user = await User.findOneOrFail({ uuid: userUuid });

        const newFile = new File({
          filename: file.filename,
          link: `http://localhost:5000/uploads/${file.filename}`,
          user,
        });

        await newFile.save();
      }
      return res
        .status(201)
        .send({ message: "files were uploaded successfully" });
    } catch (err) {
      const errObj = {
        err,
        place: `/files`,
        method: "POST",
      };
      console.log(errObj);
      return res.send(500).json(errObj);
    }
  } else {
    return res
      .status(400)
      .send({ message: "Wrong Input", place: "/files", method: "POST" });
  }
});

// UPDATE
router.put("/file/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { description } = req.body;

  if (!description)
    return res
      .status(400)
      .send({ message: "no description", place: `file/${uuid}` });

  try {
    const file = await File.findOneOrFail({ uuid });

    file.description = description;

    await file.save();

    return res.status(201).send({ message: "Edited Successfully", file });
  } catch (err) {
    const errObj = {
      err,
      place: `/files`,
      method: "POST",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

// DELETE
router.delete("/file/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const file = await File.findOneOrFail({ uuid });

    await file.remove();

    return res.status(204).send();
  } catch (err) {
    const errObj = {
      err,
      place: `/file/${uuid}`,
      method: "DELETE",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});
