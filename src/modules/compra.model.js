let mongoose = require('../../config');

let CompraShema = new mongoose.Schema({
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
            type: String,
            required: true,
            index: true
        },
        idProv2:{
            type: String,
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

module.exports = mongoose.model('Compra', CompraShema);