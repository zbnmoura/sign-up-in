const express = require('express');
const body_parser = require('body-parser');
const { create_document, read_document } = require('../helpers/mongoose');
const router = express.Router();

router.post('/up', body_parser.json());
router.post('/up', async (req, res) => {
    const { nome, email, senha, telefones } = req.body;
    try {
        const { _id: id, name, phones, token, last_login, created_at, updated_at } = await create_document({
            name: nome,
            email,
            phones: telefones,
            password: senha,
        });

        return res.status(201).json({
            token,
            id,
            email,
            nome: name,
            telefones: phones,
            data_criacao: created_at,
            data_atualizacao: updated_at,
            ultimo_login: last_login,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error });
    }
});

router.post('/in', body_parser.json());
router.post('/in', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const document = await read_document({ email, password: senha });
        if (document === null) {
            return res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
        }
        const result = {
            token: document.token,
            id: document._id,
            email: document.email,
            nome: document.name,
            telefones: document.phones,
            data_criacao: document.created_at,
            data_atualizacao: document.updated_at,
            ultimo_login: document.last_login,
        };
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
