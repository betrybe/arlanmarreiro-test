const { json } = require("body-parser");
const Users = require("../model/Users");
const router = require('express').Router()

// Rotas da API
router.post('/', async(req, res) => {
    // req.body
    const { name, email, password } = req.body
    if (!name) {
        res.status(422);
        json({ error: "Nome é Obrigatorio" })
    }
    const user = {
            name,
            email,
            password,
        }
        // Create no Mongo
    try {
        await Users.create(user)
        res.status(201).json({ message: 'Usuario Cadastrado com Sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


module.exports = router