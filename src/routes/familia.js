let FamiliaModel = require('../modules/familias.model');
let express = require('express');
let router = express.Router();

router.get('/familia/cant', (req, res) => {
    return FamiliaModel.estimatedDocumentCount()
       .then(
           cant => res.json(cant)
       )
});

router.get('/familia', (req, res) => {
    FamiliaModel.find()
    .then(doc => {
        res.json(doc);
    })
});

router.get('/familia/buscar/:id', (req, res) =>{
    FamiliaModel.find({_id : req.params.id})
     .then(doc => {
         res.json(doc);
     })
});

router.get(/*nombre de la ruta*/'/familia/orden/:valor/:modo/:nPag/:limite', (req, res)=>{
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
        }
    }
    
    FamiliaModel.find().skip((nPag - 1) * limite).limit(limite).sort(ordenar)
     .then(doc =>{
         res.json(doc);
     })
     .catch(err => {
         console.log(err);
     })
});

router.post('/familia', (req, res) => {
    if(!req.body){
        return res.status(400).send("Hace falta el cuerpo del request");
    }
    let model = new FamiliaModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0){
            return res.status(500).send(doc);
        }
        return res.status(201).send(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.put('/familia/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para realizar la búsqueda");
    }
    FamiliaModel.findByIdAndUpdate({
           _id: req.params.id
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

router.delete('/familia', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para realizar la búsqueda");
    }
    FamiliaModel.findByIdAndRemove({
           _id: req.params.id
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