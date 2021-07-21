import express from "express";
import morgan from "morgan";
import { router as routerUpload } from "../routes/upload.js";

const port = process.env["PORT"] || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/uploadAPI", routerUpload);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
