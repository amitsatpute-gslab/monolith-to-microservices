/* eslint-disable @typescript-eslint/no-var-requires */
// require("dotenv").config();

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_PORT_PG,
  DATABASE_USER_PG,
  DATABASE_PASSWORD_PG,
  DATABASE_NAME,
} = process.env;

console.log(DATABASE_NAME);
var cl = new Pool({
  host: DATABASE_HOST,
  port: DATABASE_PORT_PG ? parseInt(DATABASE_PORT_PG) : 5432,
  user: DATABASE_USER_PG,
  password: DATABASE_PASSWORD_PG,
});

async function createDatabase() {
  const client = await cl.connect();
  try {
      // Replace 'your_new_db_name' with the desired database name
      await client.query(`CREATE DATABASE ${DATABASE_NAME};`);
      console.log('Database created successfully');
  } catch (error) {
      console.error('Error creating database:', error);
  } finally {
      client.release(); // Release the client back to the pool
  }
}

createDatabase();

