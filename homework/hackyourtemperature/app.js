import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res, next) => {
  const key = process.env.API_KEY;
  const cityName = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const fetchOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  try {
    const fetchResponse = await fetch(
      `${url}?q=${cityName}&APPID=${key}`,
      fetchOptions
    );
    const result = await fetchResponse.json();
    if (result.cod === 200) {
      const weatherText = `City: ${cityName}, Temperature: ${result.main.temp}`;
      res.send(weatherText);
    } else {
      res.send("City is not found!");
    }
  } catch (error) {
    console.error(`Something wrong happend: ${error}`);
    res.status(500);
    next(error);
  }
});

export default app;
