let EmpleadoModel = require('../modules/empleado.model');
let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/empleado/cant', (req, res) => {
    return EmpleadoModel.estimatedDocumentCount()
       .then(
           cant => res.json(cant)
       )
});

router.get(/*nombre de la ruta*/'/empleado', (req, res)=>{
    EmpleadoModel.find()
     .then(doc =>{
         res.json(doc);
     })
});

router.get('/empleado/buscar/:id', (req, res) =>{
    EmpleadoModel.find({_id : req.params.id})
     .then(doc => {
         res.json(doc);
     })
});

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

router.get(/*nombre de la ruta*/'/empleado/orden/:valor/:modo/:nPag/:limite', verifyToken, (req, res)=>{
    valor = (req.params.valor !== undefined) ? req.params.valor : "";
    orden = (req.params.modo !== undefined) ? req.params.modo : 1;
    nPag = (req.params.nPag !== undefined) ? parseInt(req.params.nPag) : 1;
    limite = (req.params.limite !== undefined) ? parseInt(req.params.limite) : 10;

    //la cadena vacía es false de lo contrario true
    if(valor){
        switch(valor){
            case "Nombre" :
                ordenar = {
                    "Nombre" : orden
                };
                break;

            case "Apellido1" :
                ordenar = {
                    "Apellido1" : orden
                };
                break;

            case "Apellido2" : 
                ordenar = {
                    "Apellido2" : orden
                };
                break;

            case "idUsuario" : 
                ordenar = {
                    "idUsuario" : orden
                };
                break;
        }
    }

    jwt.verify(req.token, 'cualquierClave', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            EmpleadoModel.find().skip((nPag - 1) * limite).limit(limite).sort(ordenar)
            .then(doc =>{
                res.json(doc);
            })
            .catch(err => {
                console.log(err);
            })
        }
    })   
   
});

router.post('/empleado', (req, res) => {
    //console.log(req.body);
    if(!req.body){
        return res.status(400).send("Falta el cuerpo del request");
    }
    let model = new EmpleadoModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0){//=== son iguales en contenido y tipo
            return res.status(500).send(doc);
        }
        res.status(201).send(doc); //status es para enviar el estado y el send para agregar algo más
    })
    .catch(err => {
        //console.log(req.body);
        res.status(500).json(err);
    });
});

router.put('/empleado/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    EmpleadoModel.findOneAndUpdate({
         _id : req.params.id
       },
       req.body,
       {
           new: true
       }
    )
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/empleado/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    EmpleadoModel.findOneAndRemove({
         _id : req.params.id
       }
    )
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });

});

module.exports = router;