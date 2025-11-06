import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3003;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not set, please add it in your .env file");
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Node API Server");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log("Server is running on port 3003");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
