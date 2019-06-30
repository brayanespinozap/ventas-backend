let mongoose = require('../../config');

let ventaSchema = new mongoose.Schema({
    idVenta: {
        type: String,
        unique: true,
        required: true
    },
    idCliente: {
        type: String,
        index: true,
        required: true
    },
    idEmpleado: {
        type: String,
        index: true,
        required: true
    },
    codigo: {
        type: String,
        index: true,
        required: true
    },
    cant: {
        type: Number,
        required: true
    },
    fecha: {
        type: String,
        index: true,
        required: true
    },
    descuento: Number,
    IV: Number,
    tipoPago: String,
    aprobaTarj: String    
});

module.exports = mongoose.model('Venta', ventaSchema);