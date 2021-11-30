const { json } = require("body-parser");
const Users = require("../model/Users");
const router = require('express').Router()

// Rotas da API
router.post('/', async(req, res) => {
    // req.body
    const { name, email, password } = req.body
    if (!name) res.status(400).json({ error: "Nome é Obrigatorio" })
    else if (!email) res.status(400).json({ error: "E-mail é obrigatorio" })
    else if (!password) res.status(400).json({ error: "Senha é obrigatório" })
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

// Buscar usuarios
router.get('/', async(req, res) => {
    try {
        const user = await Users.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Pesquisar Usuarios
router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = Users.findOne({ _id: id })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})
module.exports = router