let mongoose = require('../../config');

let EmpleadoSchema = new mongoose.Schema({
    id : {
        type: String,
        unique: true,
        required: true
        //cuado digo que es unico no necesita el index porque ya por defecto es indexado
    },
    idUsuario : {
        type: String,
        required: true,
        unique: true
    },
    Nombre : {
        type: String,
        require: true,
        index: true
    },
    Apellido1 : {
        type: String,
        require: true,
        index: true
    },
    Apellido2 : {
        type: String,
        require: true,
        index: true
    },
    Telefono : {
        tel1 : String,
        tel2 : String
    },
    Correo : {
        type: String,
        require: true
    },
    Direccion : {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Empleado', EmpleadoSchema);
