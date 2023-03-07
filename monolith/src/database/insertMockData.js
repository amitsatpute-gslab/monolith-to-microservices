const knex = require("./client.js");
const orders = require("./mockOrders.js");
const products = require("./mockProducts.js");

async function insertData() {
  await knex("users").insert([
    {
      id: "2c5be9a7-2b81-44d0-bdf2-3f79f8dbea3e",
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
