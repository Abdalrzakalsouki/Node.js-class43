import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName || "no city provided!";
  res.send(cityName);
});

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
