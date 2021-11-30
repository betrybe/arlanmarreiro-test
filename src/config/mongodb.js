let mongoose = require('mongoose');

const MONGO_DB_URL = 'localhost/'
const DB_NAME = 'Cookmaster'

mongoose
    .connect((
        `mongodb://${MONGO_DB_URL}${DB_NAME}`
    ))
    .then(() => {
        console.log('Banco conectado com sucesso')
    })
    .catch(e => {
        console.log('Não foi possivel conectar com o MongoDB')
            // console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })