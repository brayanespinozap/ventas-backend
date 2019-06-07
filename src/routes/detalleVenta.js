let DetalleVentaModel = require('../modules/detalleVenta.model');
let express = require('express');
let router = express.Router();

router.get('/detalleVenta', (req, res) => {
    DetalleVentaModel.find()
      .then(doc => {
          res.json(doc);
      });
});

router.get('/detalleVenta/buscar/:id', (req, res) =>{
    DetalleVentaModel.find({_id : req.params.id})
     .then(doc => {
         res.json(doc);
     })
});

router.post('/detalleVenta', (req, res) => {
    //console.log(req.body);
    if(!req.body){
        return res.status(400).send('Falta el cuerpo del request');
    }
    let model = new DetalleVentaModel(req.body);
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

router.put('/detalleVenta/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda d");
    }
    DetalleVentaModel.findOneAndUpdate({
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

router.delete('/detalleVenta/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para hacer la busqueda");
    }
    DetalleVentaModel.findOneAndRemove({
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