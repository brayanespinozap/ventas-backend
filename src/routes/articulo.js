let ArticuloModel = require('../modules/articulos.model');
let express = require('express');
let router = express.Router();

router.get('/articulo/cant', (req, res) => {
    return ArticuloModel.estimatedDocumentCount()
       .then(
           cant => res.json(cant)
       )
})

router.get('/articulo', (req, res) => {
    ArticuloModel.find()
    .then(doc => {
        res.json(doc);
    })
});

router.get('/articulo/buscar/:id', (req, res) =>{
    ArticuloModel.find({_id : req.params.id})
     .then(doc => {
         res.json(doc);
     })
});

router.get(/*nombre de la ruta*/'/articulo/orden/:valor/:modo/:nPag/:limite', (req, res)=>{
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
    
    ArticuloModel.find().skip((nPag - 1) * limite).limit(limite).sort(ordenar)
     .then(doc =>{
         res.json(doc);
     })
     .catch(err => {
         console.log(err);
     })
});

router.post('/articulo', (req, res) => {
    //console.log(req.body);
    if(!req.body){
        return res.status(400).send('Falta el cuerpo del request');
    }
    let model = new ArticuloModel(req.body);
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

router.put('/articulo/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda d");
    }
    ArticuloModel.findOneAndUpdate({
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

router.delete('/articulo/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    ArticuloModel.findOneAndRemove({
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