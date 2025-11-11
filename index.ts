import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Product } from "./models/product.model";

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3003;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not set, please add it in your .env file");
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Node API Server");
});

app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
});

app.get("/api/product/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
});

app.post("/api/products", async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: String(error) });
  }
});

// update a product
app.put();

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
