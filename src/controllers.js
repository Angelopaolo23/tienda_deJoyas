const { Pool } = require('pg');
const format = require('pg-format');

//HAY QUE CAMBIARLO A VARIABLES DE ENTORNO
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "joyas",
    port: 5432,
    allowExitOnIdle: true
});