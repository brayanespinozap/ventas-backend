let mongoose = require('../../config');

let DetalleVentaShema = new mongoose.Schema({
    idVenta:{
        type: Number,
        required: true,
        index: true
    },
    codProducto:{
        type: Number,
        required: true,
        index: true
    },
    cant:{
        type: Number,
        required: true,
        index: true
    },
    precio:{
        type: Number,
        required: true
    },
    descuento:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('DetalleVenta', DetalleVentaShema);