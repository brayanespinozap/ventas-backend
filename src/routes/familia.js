let FamiliaModel = require('../modules/familias.model');
let express = require('express');
let router = express.Router();

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