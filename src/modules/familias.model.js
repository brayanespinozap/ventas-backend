let mongoose = require('../../config');

let FamiliaSchema = new mongoose.Schema({
    idFamilia:{
        type: String,
        unique: true,
        required: true
    },
    Nombre: {
        type: String,
        required: true,
        index: true
    }
});

module.exports = mongoose.model('Familia', FamiliaSchema);