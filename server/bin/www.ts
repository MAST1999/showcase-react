import express from "express";

const port = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
