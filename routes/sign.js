const express = require('express');
const body_parser = require('body-parser');
const { save_document } = require('../helpers/mongoose');
const router = express.Router();

router.post('/up', body_parser.json());
router.post('/up', async (req, res) => {
    const { nome, email, senha, telefones } = req.body;
    try {
        const { _id: id, name, phones, token, last_login, created_at, updated_at } = await save_document({
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

module.exports = router;

// const request = {
//     nome: 'string',
//     email: 'string',
//     senha: 'senha',
//     telefones: [
//         {
//             numero: '123456789',
//             ddd: '11',
//         },
//     ],
// };

// const usuario = {
//     nome,
//     email,
//     telefones,
// };
// const response_200 = { usuario, id, data_criacao, data_atualizacao, ultimo_login, token };
// const response_erro_email = 'E-mail já existente';
// const response_erro_geral = 'erro geral';
// sign in

/**
 * Este endpoint irá receber um objeto com e-mail e senha.
Caso o e-mail exista e a senha seja a mesma que a senha persistida, retornar
igual ao endpoint de sign_up.
Caso o e-mail não exista, retornar erro com status apropriado mais a mensagem
"Usuário e/ou senha inválidos"
Caso o e-mail exista mas a senha não bata, retornar o status apropriado 401
mais a mensagem "Usuário e/ou senha inválidos"
 */
