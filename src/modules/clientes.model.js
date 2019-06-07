let mongoose = require('../../config');

let clienteSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
        required: true
    },
    idUsuario:{
        type: Number,
        unique: true,
        required: true
    },
    Nombre:{
        type: String,
        required: true,
        index: true
    },
    Apellido1:{
        type: String,
        required: true,
        index: true
    },
    Apellido2:{
        type: String,
        required: true,
        index: true
    },
    Telefono:{
        tel1: String,
        tel2: String
    },
    Correo:{
        type: String,
        required: true
    },
    Direccion:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cliente', clienteSchema);