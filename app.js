const express = require('express');
const app = express();
const puerto = 3000;

app.get('/', (req, res) => {
    res.send('Servicio de BD Comercializadora en funcionamiento');
});

//Cargar librería para 'parseo' de contenido JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Cargar libreria para habilitar CORS
const cors = require('cors');
app.use(cors())

require("./rutas/producto.rutas")(app);
require("./rutas/venta.rutas")(app);
require("./rutas/usuario.rutas")(app);

app.listen(puerto, () => {
    console.log(`Servicio de BD Comercializadora escuchando en http://localhost:${puerto}`);
})