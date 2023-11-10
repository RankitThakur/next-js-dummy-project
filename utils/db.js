import { Pool } from "pg";

const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "test",
  password: "root",
  port: 5432,
});

export default pool;
