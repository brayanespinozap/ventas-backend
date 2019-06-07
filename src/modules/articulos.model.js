let mongoose = require('../../config');

let ArticuloShema = new mongoose.Schema({
    codigo:{
        type: String,
        unique: true,
        required: true
    },
    idFamilia:{
        type: Number,
        required: true,
        index: true
    },
    idProveedor:{
        idProv1:{
            type: Number,
            required: true,
            index: true
        },
        idProv2:{
            type: Number,
            required: true,
            index: true
        }
    },
    Nombre:{
        type: String,
        index: true,
        required: true
    },
    precio:{
        type: Number,
        required: true,
        index: true
    },
    stock:{
        type: Number,
        required: true
    },
    min: Number,
    max: Number
});

module.exports = mongoose.model('Articulo', ArticuloShema);