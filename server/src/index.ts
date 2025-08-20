import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import tasksRouter from "./routes/tasksRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', tasksRouter);
app.use('/api', userRouter);

app.get("/api/calendar", (req, res) => {
  res.json({ message: "Test Calendar" });
});

if (process.env.NODE_ENV === "production") {
  // In ESM Modules these are not available
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const clientBuildPath = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientBuildPath));

  // Serve index.html for any non-API route
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});