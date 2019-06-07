let mongoose = require('../../config');

let ProveedorSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    }, 
    Nombre: {
        type: String,
        index: true,
        required: true
    },
    Contacto: {
        type: String,
        required: true
    },
    Telefono: {
        tel1: String,
        tel2: String
    },
    Correo: {
        type: String,
        required: true
    },
    Direccion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);