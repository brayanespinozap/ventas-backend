//console.log("Hola mundo");

//let y var son para crear variables
//const es para crear una constante

//express es una librería para hacer uso de ellas
//express es el servidor que estamos ejecutando cuando usamos el npm start

let express = require('express'); // importado
let cors = require('cors');

let app = express(); // creo una instancia

//importaciones
let personaRoute = require('./routes/persona');
let empleadoRoute = require('./routes/empleado');
let usuarioRoute = require('./routes/usuario');
let clienteRoute = require('./routes/cliente');
let ventaRoute = require('./routes/venta');
let proveedorRoute = require('./routes/proveedor');
let familiaRoute = require('./routes/familia');
let articuloRoute = require('./routes/articulo');
let detalleVentaRoute = require('./routes/detalleVenta');


//esto le permite al servidor entender el formato json
let bodyParser = require('body-parser');

/*
let corsOption = {
    origin: '';
    optionsSuccess
}
*/


app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public')); //asignarle la pagina que se va a ejecutar/levantar
app.use(personaRoute);
app.use(empleadoRoute);
app.use(usuarioRoute);
app.use(clienteRoute);
app.use(ventaRoute);
app.use(proveedorRoute);
app.use(familiaRoute);
app.use(detalleVentaRoute);
app.use(articuloRoute);


const PORT = process.env.PORT || 3000; // se le va a asignar el puerto que esta predeterminado para express o el 3000

app.listen(PORT, () =>{
    console.info("El servidor se inició en el puerto " + PORT);
});



