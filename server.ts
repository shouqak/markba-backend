import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes"; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://markba-task-7sij-qtnc0lzuy-shoqs-projects.vercel.app",
    credentials: true,
  })
);

app.use("/auth", authRouter);

app.get("/", (_req, res) => {
  res.send("Welcome to backend");
});

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT,  () => {
  console.log(`✅ Backend running on http://${PORT}`);
});
