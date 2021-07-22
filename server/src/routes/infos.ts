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
