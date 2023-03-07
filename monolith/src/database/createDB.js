/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

var mysql = require("mysql");

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

var con = mysql.createConnection({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
});

con.connect(function (err) {
  try {
    console.log("Connected!");
    con.query(`CREATE DATABASE ${DATABASE_NAME} `, function (err, result) {
      if (err) {
        console.error("Error creating DB, it may already exist");
      }
      console.log(result);
      con.end();
    });
  } catch (e) {
    console.log("ERROR:", e);
  }
});
