import express from "express";
import type { Request, Response } from "express";

const app = express();

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Node API");
});
