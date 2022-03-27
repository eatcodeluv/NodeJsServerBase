const Pool = require("pg").Pool;
//set a config for what or where you want to connect the db

const pool = new Pool({
    user: "postgres",
    password: "rla938402",
    database: "todo_database",
    host: "localhost",
    port: 5433
});

module.exports = pool;
