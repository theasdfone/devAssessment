import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import assessmentRoutes from "./routes/assessment.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: clientOrigin
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok"
  });
});

app.use("/api/assessment", assessmentRoutes);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
