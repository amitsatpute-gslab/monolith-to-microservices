const knex = require("../../database/client.js");

async function listProducts() {
  const products = await knex("products").select("*").from("products");
  return products;
}

async function productById(id) {
  const product = await knex("products")
    .select("*")
    .from("products")
    .where("id", "=", id);
  return product[0];
}

module.exports = { listProducts, productById };
