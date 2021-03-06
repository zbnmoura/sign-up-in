const express = require('express');
const router = express.Router();

const { find_by_id } = require('../helpers/mongoose');
const { run_validation } = require('../helpers/validation');

//desculpe pela massaroca, da pra melhorar
//TODO desacoplar ifs numa função
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    //separando o Bearer do "token"
    const pure_authorization = authorization.split(' ')[1];
    try {
        //verifica se o token e id estao presentes no formato indicado
        await run_validation('user_by_id', { id, authorization: pure_authorization });
    } catch (error) {
        const {
            details: [{ message }],
        } = error;
        console.error(message || error);
        return res.status(400).json({ message } || 'Erro inesperado');
    }
    //se o token esta presente
    // if (!authorization) return res.status(401).json({ message: 'Não autorizado' });
    // const { token, last_login } = await find_by_id(id);
    const user = await find_by_id(id);

    //id encontrado na base
    if (user) {
        const { token, last_login } = user;

        //token valido
        if (token === pure_authorization) {
            const today = new Date();
            const new_last_login = new Date(last_login);
            const diff_dates = today - new_last_login;

            //converte para minutos a diferença entre hoje e o ultimo login
            const diff_minutes = Math.round(((diff_dates % 86400000) % 3600000) / 60000);

            //se a sessao é maior que 30 minutos
            if (diff_minutes > 30) {
                return res.status(401).json({ message: 'Não autorizado' });
            }
            //sesao valida
            else {
                return next();
            }
        }
        //token na base igual a da requisição
        else {
            return res.status(401).json({ message: 'Não autorizado' });
        }
    } else {
        return res.status(404).json({ message: 'Recurso não encontrado' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { phones, _id, name, email, last_login, created_at, updated_at } = await find_by_id(id);
        const result = {
            id: _id,
            email,
            nome: name,
            telefones: phones,
            data_criacao: created_at,
            data_atualizacao: updated_at,
            ultimo_login: last_login,
        };
        return res.status(200).json(result);
    } catch (error) {
        const {
            details: [{ message }],
        } = error;
        console.error(message || error);
        return res.status(400).json({ message } || 'Erro inesperado');
    }
});

module.exports = router;
