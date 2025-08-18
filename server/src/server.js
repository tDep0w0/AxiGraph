import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getJson } from "serpapi";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  const response = await getJson({
    engine: "google_patents",
    q: query,
    num: 40,
    api_key: process.env.SERPAPI_KEY,
  });
  res.json(response["organic_results"]);

  // res.json(searchResults);
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://patents.google.com/patent/US11768636B2/en"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patent data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
