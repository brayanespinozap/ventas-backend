let VentaModel = require('../modules/ventas.model');
let express = require('express');
let router = express.Router();

router.get('/venta/cant', (req, res) => {
    return VentaModel.estimatedDocumentCount()
       .then(
           cant => res.json(cant)
       )
});

router.get('/venta', (req, res) => {
    VentaModel.find()
      .then(doc => {
          res.json(doc);
      });
});

router.get('/venta/buscar/:id', (req, res) =>{
    VentaModel.find({_id : req.params.id})
     .then(doc => {
         res.json(doc);
     })
});

router.get(/*nombre de la ruta*/'/venta/orden/:valor/:modo/:nPag/:limite', (req, res)=>{
    valor = (req.params.valor !== undefined) ? req.params.valor : "";
    orden = (req.params.modo !== undefined) ? req.params.modo : 1;
    nPag = (req.params.nPag !== undefined) ? parseInt(req.params.nPag) : 1;
    limite = (req.params.limite !== undefined) ? parseInt(req.params.limite) : 10;

    //la cadena vacía es false de lo contrario true
    if(valor){
        switch(valor){
            case "Descuento" :
                ordenar = {
                    "descuento" : orden
                };
                break;
        }
    }
    
    VentaModel.find().skip((nPag - 1) * limite).limit(limite).sort(ordenar)
     .then(doc =>{
         res.json(doc);
     })
     .catch(err => {
         console.log(err);
     })
});

router.post('/venta', (req, res) => {
    //console.log(req.body);
    if(!req.body){
        return res.status(400).send("Falta el cuerpo del request");
    }
    let model = new VentaModel(req.body);
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

router.post('/venta', (req, res) => {
    //console.log(req.body);
    if(!req.body){
        return res.status(400).send('Falta el cuerpo del request');
    }
    let model = new VentaModel(req.body);
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

router.put('/venta/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda d");
    }
    VentaModel.findOneAndUpdate({
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

router.delete('/venta/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    VentaModel.findOneAndRemove({
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