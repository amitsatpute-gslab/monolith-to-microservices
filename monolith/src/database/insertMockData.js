const knex = require("./client.js");
const orders = require("./mockOrders.js");
const products = require("./mockProducts.js");

async function insertData() {
  await knex("users").insert([
    {
      id: "08ddc1ec-aabc-4484-ba72-bbabcc16f427",
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
