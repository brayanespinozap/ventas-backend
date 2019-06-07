let mongoose = require('../../config');

let FamiliaSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: true,
        index: true
    }
});

module.exports = mongoose.model('Familia', FamiliaSchema);