const knex = require("../../database/client.js");

async function listOrders() {
  const orders = await knex("orders").select("*").from("orders");
  return orders;
}

async function orderById(id) {
  const order = await knex("orders")
    .select("*")
    .from("orders")
    .where("id", "=", id);
  return order[0];
}

module.exports = { listOrders, orderById };
