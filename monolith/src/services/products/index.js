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

async function addProduct(
  productObj = {
    name: "",
    description: "",
    picture: "",
    cost: 0.0,
    categories: [],
  }
) {
  try {
    const data = await knex("products").insert(productObj).returning("*");
    return {
      message: "Record inserted",
      data: data,
    };
  } catch (e) {
    console.log(e);
    return {
      error: e.message,
      data: null,
    };
  }
}

async function updateProduct(productId, productObj) {
  try {
    const data = await knex("products")
      .where("id", "=", productId)
      .update(productObj)
      .returning("*");

    return {
      message: "Record updated",
      data: data,
    };
  } catch (e) {
    console.log(e);
    return {
      error: e.message,
      data: null,
    };
  }
}

async function deleteProduct(productId) {
  try {
    const data = await knex("products").where("id", "=", productId).del();
    return {
      message: data > 0 ? "Product deleted" : "Product not found",
      data: { productId: data > 0 ? productId : null },
    };
  } catch (e) {
    console.log(e);
    return {
      error: e.message,
      data: null,
    };
  }
}

module.exports = {
  listProducts,
  productById,
  addProduct,
  deleteProduct,
  updateProduct,
};
