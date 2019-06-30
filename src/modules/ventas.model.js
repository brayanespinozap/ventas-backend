let mongoose = require('../../config');

let ventaSchema = new mongoose.Schema({
    idVenta: {
        type: String,
        unique: true,
        required: true
    },
    idCliente: {
        type: Number,
        index: true,
        required: true
    },
    idEmpleado: {
        type: Number,
        index: true,
        required: true
    },
    codigo: {
        type: Number,
        index: true,
        required: true
    },
    cant: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        index: true,
        required: true
    },
    descuento: Number,
    IV: Number,
    tipoPago: String,
    aprobaTarj: String    
});

module.exports = mongoose.model('Venta', ventaSchema);