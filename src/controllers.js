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
// localhost:3000/joyas?limits=3&page=2&order_by=stock_ASC
const getJoyas = async ({limits = 10, order_by="precio_ASC", page = 1}) => {
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
    campo,
    direccion,
    limits,
    offset);
    const { rows: inventarioJoyas } = await pool.query(formattedQuery);
    return inventarioJoyas
};

const HATEOASformat = (joyas) => {
    let stockTotal = 0;
    const results = joyas.map((joya) => {
        stockTotal += joya.stock;
        return {
            name: joya.nombre,
            href: `/joyas/joya/${joya.id}`,
        }
    });
    const totalJoyas = joyas.length;

    const HATEOAS = {
        totalJoyas,
        stockTotal,
        results
    };
    return HATEOAS
};

const getJoyasByFilter = async ({precio_max, precio_min, categoria, metal}) => {
    let filtros = [];
    const values = [];

    const addFilter = (campo, comparador, valor) => {
        values.push(valor);
        const {length} = filtros;
        filtros.push(`${campo} ${comparador} $${length + 1}`)
    };
    
    if (precio_max) addFilter('precio', '<=', precio_max);
    if (precio_min) addFilter('precio', '>=', precio_min);
    if (categoria) addFilter('categoria', '=', categoria);
    if (metal) addFilter('metal', '=', metal);
    let consulta = 'SELECT * FROM inventario';

    if (filtros.length > 0) {
        filtros = filtros.join(" AND ");
        consulta += ` WHERE ${filtros}`
    }
    const {rows: invetarioJoyasFiltrado} = await pool.query(consulta, values);
    return invetarioJoyasFiltrado 
};

module.exports = { getJoyas, HATEOASformat, getJoyasByFilter };