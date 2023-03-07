const knex = require("../../database/client.js");
const { generateOrderDetails } = require("./dataFormatter.js");

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

async function addOrder(
  orderObj = {
    userId: "",
    totalCost: 0.0,
    productIds: [],
  }
) {
  try {
    const data = await knex("orders").insert(orderObj).returning("*");
    return {
      message: "order generated",
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

async function updateOrder(orderId, orderObj) {
  try {
    const data = await knex("orders")
      .where("id", "=", orderId)
      .update(orderObj)
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

async function deleteOrder(orderId) {
  try {
    const data = await knex("orders").where("id", "=", orderId).del();
    return {
      message: data > 0 ? "Order deleted" : "Order not found",
      data: { orderId: data > 0 ? orderId : null },
    };
  } catch (e) {
    console.log(e);
    return {
      error: e.message,
      data: null,
    };
  }
}

async function getOrderDetails(orderId) {
  const order = await knex("orders")
    .join("users", "orders.userId", "=", "users.id")
    .select("orders.*", "users.email")
    .where("orders.id", "=", orderId);
  const data = generateOrderDetails(order[0]);
  return data;
}

module.exports = {
  listOrders,
  orderById,
  addOrder,
  deleteOrder,
  updateOrder,
  getOrderDetails,
};
