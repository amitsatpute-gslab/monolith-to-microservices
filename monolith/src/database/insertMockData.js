const knex = require("./client.js");
const orders = require("./mockOrders.js");
const products = require("./mockProducts.js");

async function insertData() {
  await knex("users").insert([
    {
      id: "d3dec82d-684d-4d0c-9703-c4bd5b330c39",
      full_name: "test user",
      address: "Mumbai,MH",
      email: "test.user@gmail.com",
    },
  ]);
  console.log("User added");

  await knex("products").insert(products);
  console.log("products added");

  await knex("orders").insert(orders);
  console.log("oreders added");

  knex.destroy();
}

insertData();
