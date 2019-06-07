let express = require('express'); //este metodo es de node
let router = express.Router();

//localhost:3000/persona?nombre=Brayan Espinoza
router.get('/persona', (req, res) => { //req es lo que viene desde el cliente hacie el servidor(header, body , parametros)
    //res es lo que vamos a devolver

    if(req.query.nombre){
        res.send('Tienes una petición de persona ' + req.query.nombre);
    }else{
        res.send('Tienes una petición a persona');
    }     

});

router.get('/persona/:nombre', (req, res) => {
    // /:nombre es como una variable
    // si quisiera mas "variables" lo indico con un slash y :
    res.send('Tienes una petición de la persona ' + req.params.nombre);
});
module.exports = router;