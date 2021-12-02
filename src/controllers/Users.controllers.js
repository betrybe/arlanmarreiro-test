const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const users = require('../model/Users');

module.exports = {
    index(request, response) {
        response.json({
            mensagem: 'Usuario',
        });
    },
    async create(request, response) {
        const errors = validationResult(request);
        const { name, email, password } = request.body;
        if (!errors.isEmpty() || !name || !email || !password) {
            return response.status(400).json({ message: 'Invalid entries. Try again.' });
        }
        await users.findOne({ email }).then((dados) => {
            if (!dados) {
                const role = 'user';
                users.create({ name, email, password, role });
                const user = { name, email, role };
                return response.status(201).json({ user });
            }
            return response.status(409).json({ message: 'Email already registered' });
        });
    },

    async login(request, response) {
        const errors = validationResult(request);
        const { email, password } = request.body;
        if (!errors.isEmpty() || !email || !password) {
            return response.status(401).json({ message: 'All fields must be filled' });
        }
        const data = { email, password };
        await users.findOne(data).then((user) => {
            if (user) {
                const id = mongoose.mongo.ObjectId(user.id).toString();
                const { role } = user;
                const token = jwt.sign({ id, email, role }, 'e10adc3949ba59abbe56e057f20f883e', {
                    expiresIn: '1d',
                });
                return response.status(200).json({ token });
            }
            return response.status(401).json({ message: 'Incorrect username or password' });
        });
    },

};