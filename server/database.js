import pg from "pg";
import env from "dotenv";

const { Pool } = pg;
env.config();
// const pool = new Pool({
//   //local variables
//   //env variables
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connection to PostgreSQL Successful");
});

export default pool;
