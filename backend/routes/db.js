const { Pool } = require("pg");

// Create a new pool (recommended over single client for multiple queries)
const pool = new Pool({
  user: "postgres",     // e.g. postgres
  host: "localhost",         // or server IP
  database: "linktracre", // your DB name
  password: "Palak@0205",
  port: 5432,                // default PostgreSQL port
});

module.exports = pool;
