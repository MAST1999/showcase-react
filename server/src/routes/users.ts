import { validateOrReject } from "class-validator";
import { Router } from "express";
import { User } from "../entity/User.js";

export const router = Router();

// POST
router.post("/user", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });

    await validateOrReject(user);

    await user.save();

    return res.status(201).json(user);
  } catch (err) {
    const errObj = {
      err,
      place: "/user",
      method: "POST",
    };
    console.log(errObj);
    return res.status(500).json(errObj);
  }
});

// GET
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    return res.send(users);
  } catch (err) {
    const errObj = {
      err,
      place: "/user",
      method: "GET",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

router.get("/user/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail({ uuid }, { relations: ["infos"] });

    return res.send(user);
  } catch (err) {
    const errObj = {
      err,
      place: `/user/${uuid}`,
      method: "GET",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

router.get("/user/:uuid/files", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail({ uuid }, { relations: ["files"] });

    return res.send(user);
  } catch (err) {
    const errObj = {
      err,
      place: `/user/${uuid}/files`,
      method: "GET",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

router.get("/users/files", async (req, res) => {
  try {
    const user = await User.find({ relations: ["files"] });

    return res.send(user);
  } catch (err) {
    const errObj = {
      err,
      place: `/users/files`,
      method: "GET",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

// UPDATE
router.put("/user/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { username, email, password } = req.body;

  try {
    const user = await User.findOneOrFail({ uuid });

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    return res.json(user);
  } catch (err) {
    const errObj = {
      err,
      place: `/user/${uuid}`,
      method: "PUT",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});

// DELETE
router.delete("/user/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail({ uuid });

    await user.remove();

    return res.status(204);
  } catch (err) {
    const errObj = {
      err,
      place: `/user/${uuid}`,
      method: "DELETE",
    };
    console.log(errObj);
    return res.send(500).json(errObj);
  }
});
