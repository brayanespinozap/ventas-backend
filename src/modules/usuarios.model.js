let mongoose = require('../../config');
let bcrypt = require('bcryptjs');

let UsuarioSchema = new mongoose.Schema({
    idUsuario: {
        type: String,
        unique: true,
        required: true
    },
    usuario: {
        type: String,
        unique: true,
        required: true
    },
    passw: {
        type: String,
        required: true,
        minlength: [8, 'Contraseña debe ser de 8 o más caracteres'],
        maxlength: [16, 'Contraseña debe tener 16 caracteres como máximo']
    },
    rol: {
        type: Number,
        default: 3
    },
    token: String
});

UsuarioSchema.pre('save', function(next){
    bcrypt.genSalt(10,(err, salt) =>{
        bcrypt.hash(this.passw, salt, (err, hash) => {
            this.passw = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
