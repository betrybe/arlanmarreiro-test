const jwt = require('jsonwebtoken')
const { decode } = require('punycode')
const { promisify } = require('util')

const recipes = require('../model/Recipes')

module.exports = {
    index(req, res) {
        res.json({
            mensagem: 'Recipes'
        })
    },
    // Criação da receita
    async create(req, res) {
        const { name, ingredients, preparation } = req.body
        const token = req.headers.authorization
        if (!name || ingredients || preparation || !token) {
            return res.status(400).json({ message: "Invlid entries. Try again." })
        }
        await promisify(jwt.verify)(token, 'e10adc3949ba59abbe56e057f20f883e').then((decode) => {
            const { id } = decode
            const image = ''
            const userId = id
            const data = { name, ingredients, preparation, userId, image }
            recipes.create(data).then((recipe) => res.status(201).json({ recipe }))
        }).catch(() => res.status(401).json({ message: 'Jwt malformed' }))
    },



}