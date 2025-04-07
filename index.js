import express from "express";

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
