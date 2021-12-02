const jwt = require('jsonwebtoken')
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
        const { name, ingredients, preparation } = req.body;
        const token = req.headers.authorization;
        if (!name || !ingredients || !preparation || !token) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }
        await promisify(jwt.verify)(token, 'e10adc3949ba59abbe56e057f20f883e').then((decode) => {
            const { id } = decode;
            const image = '';
            const userId = id;
            const data = { name, ingredients, preparation, userId, image };
            recipes.create(data).then((recipe) => res.status(201).json({ recipe }));
        }).catch(() => res.status(401).json({ message: 'Jwt Malformed' }));
    },

    // Listar Receitas
    async listar(req, res) {
        await recipes().then((receitas) => res.status(200).json(receitas))
            .catch((error) => res.status(400).json(error))
    },

    // Pesquisar por ID
    async listarId(req, res) {
        try {
            const recipe = await recipes.findById(req.params.id)
            return res.status(200).json(recipe)
        } catch (error) {
            return res.status(404).json({ message: "Recipe not Found" })
        }
    },

    // Editar
    async editar(req, res) {
        const token = req.req.headers.authorization
        const { name, ingredients, preparation } = req.body
        let dados = '';
        let receita = '';
        let userId = '';
        let UpdateReceita = '';
        if (!token) { return res.status(401).json({ message: "Missing Auth Token" }) }
        try {
            dados = await promisify(jwt.verify)(token, 'e10adc3949ba59abbe56e057f20f883e')
        } catch (error) {
            return res.status(401).json({ message: "Jwt Malformed" })
        }
        receita = await recipes.findById(req.params.id)
        if (!dados.id === receita.userId || dados.role === 'admin') {
            userId = receita.userId
            const update = { userId, name, ingredients, preparation }
            UpdateReceita = await recipes.findOneAndUpdate(req.params.id, update, {
                new: true,
            })
            return res.status(200).json(UpdateReceita)
        }
    },

    async deletar(req, res) {
        const token = req.headers.authorization;
        let dados = '';
        let receita = '';
        if (!token) { return res.status(401).json({ message: 'missing auth token' }); }
        try {
            dados = await promisify(jwt.verify)(token, 'e10adc3949ba59abbe56e057f20f883e');
        } catch (err) {
            return res.status(401).json({ message: 'jwt malformed' });
        }
        receita = await recipes.findById(req.params.id);
        if (dados.id === receita.userId || dados.role === 'admin') {
            await recipes.findOneAndDelete(req.params.id)
                .then(() => res.status(204).json())
                .catch(() => res.status(204).json());
        }
    },

    async imageRecipes(req, res) {
        const token = req.headers.authorization;
        let dados = '';
        let receita = '';
        if (!token) { return res.status(401).json({ message: 'missing auth token' }); }
        try {
            dados = await promisify(jwt.verify)(token, 'e10adc3949ba59abbe56e057f20f883e');
        } catch (err) {
            return res.status(401).json({ message: 'jwt malformed' });
        }
        receita = await recipes.findById(req.params.id);
        if (dados.id === receita.userId || dados.role === 'admin') {
            const { userId } = receita;
            const update = {
                userId,
                image: `localhost:3000/src/uploads/${req.params.id}.jpeg`,
            };
            await recipes.findOneAndUpdate(req.params.id, update, { new: true })
                .then((receitaUpdate) => res.status(200).json(receitaUpdate))
                .catch((err) => res.status(400).json({ err }));
        }
    },

}