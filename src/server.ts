import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import path from "path";

import connectDB from "./config/db";

dotenv.config();

connectDB();

const app: Express = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

//CORS

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the API" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
