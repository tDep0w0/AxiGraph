import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getJson } from "serpapi";
import { searchResults } from "./coffee.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/api/search", async (req, res) => {
  // const query = req.query.q;
  // const response = await getJson({
  //   q: query,
  //   num: 40,
  //   api_key: process.env.SERPAPI_KEY,
  // });
  // res.json(response["organic_results"]);

  res.json(searchResults);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
