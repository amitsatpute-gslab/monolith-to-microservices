/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  listProducts,
  productById,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("./services/products");
const {
  listOrders,
  orderById,
  addOrder,
  deleteOrder,
  updateOrder,
  getOrderDetails,
} = require("./services/orders");
const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4001;

//Load orders and products for pseudo database
const orders = require("../data/orders.json").orders;
const products = require("../data/products.json").products;

//Serve website
app.use(express.static(path.join(__dirname, "..", "public")));

//Get all products
app.get("/service/products", async (req, res) => {
  const productList = await listProducts();
  return res.json(productList);
});

//Get products by ID
app.get("/service/product/:id", async (req, res) => {
  const product = await productById(req.params.id);
  return res.json(product);
});

// Add new products
app.post("/service/addproduct", async (req, res) => {
  const body = { ...req.body, categories: JSON.stringify(req.body.categories) };
  const data = await addProduct(body);
  return res.json(data);
});

// update product
app.put("/service/updateproduct/:id", async (req, res) => {
  const body = { ...req.body, categories: JSON.stringify(req.body.categories) };
  const productId = req.params.id;
  const data = await updateProduct(productId, body);
  return res.json(data);
});

//Delete product
app.delete("/service/deleteproduct/:id", async (req, res) => {
  const data = await deleteProduct(req.params.id);
  return res.json(data);
});

//Get all orders
app.get("/service/orders", async (req, res) => {
  const orderList = await listOrders();
  return res.json(orderList);
});

//Get orders by ID
app.get("/service/orders/:id", async (req, res) => {
  const order = await orderById(req.params.id);
  return res.json(order);
});

app.get("/service/ordersdetail/:id", async (req, res) => {
  const order = await getOrderDetails(req.params.id);
  return res.json(order);
});

// Add new order
app.post("/service/addorder", async (req, res) => {
  const body = { ...req.body, productIds: JSON.stringify(req.body.productIds) };
  const data = await addOrder(body);
  return res.json(data);
});

// update order
app.put("/service/updateorder/:id", async (req, res) => {
  const body = { ...req.body, productIds: JSON.stringify(req.body.productIds) };
  const orderId = req.params.id;
  const data = await updateOrder(orderId, body);
  return res.json(data);
});

// Delete order
app.delete("/service/deleteorder/:id", async (req, res) => {
  const data = await deleteOrder(req.params.id);
  return res.json(data);
});

//Client side routing fix on page refresh or direct browsing to non-root directory
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

//Start the server
app.listen(port, () => console.log(`Monolith listening on port ${port}!`));
