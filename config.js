let mongoose = require('mongoose');

const serv = 'primercluster-5jy8k.mongodb.net';
const db = 'Ventas';
const usr = 'brayan';
const passw = 'Hardcore09!';
mongoose.connect(`mongodb+srv://${usr}:${passw}@${serv}/${db}?retryWrites=true`,
{
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify: false
});
module.exports = mongoose;