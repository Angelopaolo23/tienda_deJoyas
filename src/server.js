const express = require('express');
const app = express();
app.listen(3000, console.log("Servidor encendido en puerto 3000"));

const { getJoyas, HATEOASformat, getJoyasByFilter } = require('./controllers');



app.get('/joyas', async (req, res) => {
    try {
        const queryStrings =  req.query;
        const inventarioJoyas = await getJoyas(queryStrings);
        const HATEOAS = await HATEOASformat(inventarioJoyas)
        res.json(HATEOAS)
    } catch (error) {
        res.status(500).send(error)
    }
    
});

app.get('/joyas/filtros', async (req, res) => {
    try {
        const queryStrings = req.query;
        const inventarioJoyasFiltrado = await getJoyasByFilter(queryStrings);
        res.json(inventarioJoyasFiltrado)
    } catch (error) {
        res.status(500).send(error)
    }

});

app.get('*', (req, res) => {
    res.status(404).send("Ruta incorrecta.")
});