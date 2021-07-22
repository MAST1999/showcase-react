import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { router as routerUpload } from "./routes/files.js";
import { router as routerInfo } from "./routes/infos.js";
import { router as routerUser } from "./routes/users.js";

const port = process.env["PORT"] || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/uploadAPI", routerUpload);
app.use("/usersAPI", routerUser);
app.use("/infosAPI", routerInfo);

createConnection()
  .then(async () => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
