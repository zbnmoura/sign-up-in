const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');

const { create_document, find_email_password, find_by_email } = require('../helpers/mongoose');
const { run_validation } = require('../helpers/validation');

router.post('/up', body_parser.json());
router.post('/up', async (req, res) => {
    const { nome, email, senha, telefones } = req.body;

    try {
        await run_validation('sign_up', { nome, email, senha, telefones });
        const possible_email = await find_by_email(email);
        //verifica se email ja existe (unique=true do mongoose nao esta "travando")
        if (possible_email) {
            return res.status(400).json({ message: 'E-mail já existente' });
        }
        const { _id, name, phones, token, last_login, created_at, updated_at } = await create_document({
            name: nome,
            email,
            phones: telefones,
            password: senha,
        });

        return res.status(201).json({
            token,
            id: _id,
            email,
            nome: name,
            telefones: phones,
            data_criacao: created_at,
            data_atualizacao: updated_at,
            ultimo_login: last_login,
        });
    } catch (error) {
        const {
            details: [{ message }],
        } = error;
        console.error(message);
        return res.status(400).json({ message } || 'Erro inesperado');
    }
});

router.post('/in', body_parser.json());
router.post('/in', async (req, res) => {
    const { email, senha } = req.body;
    try {
        await run_validation('sign_in', { email, senha });
        const document = await find_email_password({ email, password: senha });
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
        const {
            details: [{ message }],
        } = error;
        console.error(message);
        return res.status(400).json({ message } || 'Erro inesperado');
    }
});

module.exports = router;
