let UsuarioModel = require('../modules/usuarios.model');
let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/usuario/cant', (req, res) => {
    return UsuarioModel.estimatedDocumentCount()
       .then(
           cant => res.json(cant)
       )
});

//en el "doc" se guardan los datos que tengo en la tabla de usuarios que traje con el metodo find
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.status(403).json('Prohibido');
    }
}

router.get('/usuario', verifyToken , (req, res) => {
    jwt.verify(req.token, 'cualquierClave', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            UsuarioModel.find()
              .then(doc => {
                 res.json(doc);
              });
        }
    })
});

router.get('/usuario/buscar/:id', (req, res) =>{
    UsuarioModel.find({_id : req.params.id})
     .then(doc => {
         res.json(doc);
     })
});

router.get('/usuario/:usuario', (req, res) =>{
    UsuarioModel.find({usuario : req.params.usuario})
        .then(doc => {
            res.json(doc);
        })       
});

router.get(/*nombre de la ruta*/'/usuario/orden/:valor/:modo/:nPag/:limite', (req, res)=>{
    valor = (req.params.valor !== undefined) ? req.params.valor : "";
    orden = (req.params.modo !== undefined) ? req.params.modo : 1;
    nPag = (req.params.nPag !== undefined) ? parseInt(req.params.nPag) : 1;
    limite = (req.params.limite !== undefined) ? parseInt(req.params.limite) : 10;

    //la cadena vacía es false de lo contrario true
    if(valor){
        switch(valor){
            case "Usuario" :
                ordenar = {
                    "Usuario" : orden
                };
                break;
            case "Rol" :
                ordenar = {
                    "Rol" : orden
                };
                break;
        }
    }

    UsuarioModel.find().skip((nPag - 1) * limite).limit(limite).sort(ordenar)
    .then(doc =>{
        res.json(doc);
    })
    .catch(err => {
        console.log(err);
    })
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
                }, 'cualquierClave', {expiresIn: '60s'});
                
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

router.put('/usuario/NombreUsuario/:usuario', (req, res) => {
    if(!req.params.usuario){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    UsuarioModel.findOneAndUpdate({
         usuario : req.params.usuario //aqui hago referencia al atributo:valor del documento
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

router.delete('/usuario/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    UsuarioModel.findOneAndRemove({
         _id : req.params.id //aqui hago referencia al atributo:valor del documento
       })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;


