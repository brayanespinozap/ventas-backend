let ProveedorModel = require('../modules/proveedores.model');
let express = require('express');
let router = express.Router();

router.get('/proveedor', (req, res) => {
    ProveedorModel.find()
      .then(doc => {
          res.json(doc);
      })
});

router.post('/proveedor', (req, res) => {
    if(!req.body){
        return res.status(400).send("Falta el cuerpo del request");
    }
    let model = new ProveedorModel(req.body);
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

router.put('/proveedor/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para realizar la búsqueda");
    }
    ProveedorModel.findOneAndUpdate({
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

router.delete('/proveedor/:id', (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Hace falta el id para realizar la búsqueda");
    }
    ProveedorModel.findOneAndRemove({
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