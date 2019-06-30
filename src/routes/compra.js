let CompraModel = require('../modules/compra.model');
let express = require('express');
let router = express.Router();

router.get('/compra/cant', (req, res) => {
    return CompraModel.estimatedDocumentCount()
       .then(
           cant => res.json(cant)
       )
})

router.get('/compra', (req, res) => {
    CompraModel.find()
    .then(doc => {
        res.json(doc);
    })
});

router.get('/compra/buscar/:id', (req, res) =>{
    CompraModel.find({_id : req.params.id})
     .then(doc => {
         res.json(doc);
     })
});

router.get(/*nombre de la ruta*/'/compra/orden/:valor/:modo/:nPag/:limite', (req, res)=>{
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
            
            case "Precio" :
                ordenar = {
                    "precio" : orden
                };
                break;

            case "Stock" :
                ordenar = {
                    "stock" : orden
                };
                break;
        }
    }
    
    CompraModel.find().skip((nPag - 1) * limite).limit(limite).sort(ordenar)
     .then(doc =>{
         res.json(doc);
     })
     .catch(err => {
         console.log(err);
     })
});

router.post('/compra', (req, res) => {
    //console.log(req.body);
    if(!req.body){
        return res.status(400).send('Falta el cuerpo del request');
    }
    let model = new CompraModel(req.body);
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

router.put('/compra/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda d");
    }
    CompraModel.findOneAndUpdate({
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

router.delete('/compra/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    CompraModel.findOneAndRemove({
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