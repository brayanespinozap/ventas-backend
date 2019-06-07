let UsuarioModel = require('../modules/usuarios.model');
let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//en el "doc" se guardan los datos que tengo en la tabla de usuarios que traje con el metodo find
router.get('/usuario', (req, res) => {
    UsuarioModel.find()
        .then(doc => {
            res.json(doc);
        });
});

router.post('/usuario/logg', (req, res) => {
    if(!req.body.usuario || !req.body.passw){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    UsuarioModel.findOne({
          usuario: req.body.usuario
       })
    .then(doc => {

        if(!doc) {
            return res.status(403).send('Inicio Incorrecto');
        }

        bcrypt.compare(req.body.passw, doc.passw, (err, resU) => {
            
            if(resU){
                //redireccionar segun el rol del usuario
                //return res.send('Inicio correcto');
                const token = jwt.sign({
                    usuario: req.body.usuario,
                    rol: doc.rol
                }, 'cualquierClave');
                
                return res.status(200).json({
                    usuario: req.body.usuario,
                    rol: doc.rol,
                    token: token
                })
            }else{
                //redireccionar a la página de login
                return res.status(403).send('Inicio incorrecto');
            }

        });
        
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/usuario', (req, res) => {
    //console.log(req.body);
    if(!req.body){
        return res.status(400).send("Falta el cuerpo del request");
    }
    let model = new UsuarioModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0){
            return res.status(500).send(doc);
        }
        return res.status(201).send(doc);
    })
    .catch(err => {
        return res.status(500).json(err);
    });
});

router.put('/usuario/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    UsuarioModel.findOneAndUpdate({
         _id : req.params.id //aqui hago referencia al atributo:valor del documento
       },
       req.body,
       {
           new: true //es para que me devuelva el nuevo dato que se introdujo y no el viejo
       }
    )
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/usuario', (req, res) => {
    if(!req.query.idUsuario){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    UsuarioModel.findOneAndRemove({
         idUsuario : req.query.idUsuario //aqui hago referencia al atributo:valor del documento
       })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;


