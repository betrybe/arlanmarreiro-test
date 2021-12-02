const express = require('express');
const usersRouter = require('../routes/usersRouter')
const app = express();
app.use(express.json())

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (req, res) => {
    res.json({ message: 'Olá Express' });
});

// Rota de Usuarios
app.use('/users', usersRouter)
app.get('/users')

module.exports = app;