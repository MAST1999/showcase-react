import { Router } from "express";
import { Info } from "../entity/Info";
import { User } from "../entity/User";

export const router = Router();

// POST
router.post("/info/:uuid", async (req, res) => {
  const userUuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail({ uuid: userUuid });

    const { place, title } = req.body;

    const info = new Info({ list: place, title, user });

    await info.save();

    return res.send({ message: "added info", info });
  } catch (err) {
    const errObj = {
      err,
      place: `/info/${userUuid}`,
      method: "POST",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

// GET
router.get("/userInfos/:uuid", async (req, res) => {
  const userUuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail(
      { uuid: userUuid },
      { relations: ["infos", "files"] }
    );

    return res.send({ uuid: userUuid, infos: user.infos, files: user.files });
  } catch (err) {
    const errObj = {
      err,
      place: `/usersInfos/${userUuid}`,
      method: "GET",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

router.get("/filesInfos/:uuid", async (req, res) => {
  const infoUuid = req.params.uuid;

  try {
    const info = await Info.findOneOrFail(
      { uuid: infoUuid },
      { relations: ["files"] }
    );

    return res.send(info.files);
  } catch (err) {
    const errObj = {
      err,
      place: `/filesInfos/${infoUuid}`,
      method: "GET",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

// DELETE
router.delete("/info/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const info = await Info.findOne({ uuid });

    await info?.remove();

    return res.sendStatus(204);
  } catch (err) {
    const errObj = {
      err,
      place: `/info/${uuid}`,
      method: "DELETE",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});
