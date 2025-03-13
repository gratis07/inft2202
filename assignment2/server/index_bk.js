import express from "express";
import productData from "./data/product.js"
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get("/hello", (req, res) => {
  res.send("<!DOCTYPE html><html lang=\"en-us\"><head><title>INFT 2202</title></head><body><main><h1>Hello from Express</h1></main></body></html>");
});

app.get("/api/products", (req, res) => {
  res.json(productData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});