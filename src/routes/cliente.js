let ClienteModel = require('../modules/clientes.model');
let express = require('express');
let router = express.Router();

router.get('/cliente', (req, res) => {
    ClienteModel.find()
    .then(doc => {
        res.json(doc);
    });
});

router.get('/cliente/buscar/:id', (req, res) =>{
    ClienteModel.find({_id : req.params.id})
     .then(doc => {
         res.json(doc);
     })
});

router.post('/cliente', (req, res) => {
    //console.log(req.body);
    if(!req.body){
        return res.status(400).send('Falta el cuerpo del request');
    }
    let model = new ClienteModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0){
            return res.status(500).send(doc);
        }
        return res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.put('/cliente/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda d");
    }
    ClienteModel.findOneAndUpdate({
         _id : req.params.id 
       },
       req.body,
       {
           new : true
       }
    )
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/cliente/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    ClienteModel.findOneAndRemove({
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