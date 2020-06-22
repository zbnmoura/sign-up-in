const express = require('express');
const router = express.Router();
const { find_by_id } = require('../helpers/mongoose');

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
        console.error(error);
        return res.status(400).json(error);
    }
});

module.exports = router;

/**
 * Chamadas para este endpoint devem conter um header na requisição de Authentication com o valor "Bearer {token}" onde {token} é o valor do token passado na criação ou sign in de um usuário.
Caso o token não exista, retornar erro com status apropriado com a mensagem
"Não autorizado".
Caso o token exista, buscar o usuário pelo user_id passado no path e comparar
se o token no modelo é igual ao token passado no header.
Caso não seja o mesmo token, retornar erro com status apropriado e mensagem
"Não autorizado"
Caso seja o mesmo token, verificar se o último login foi a MENOS que 30
minutos atrás.
Caso não seja a MENOS que 30 minutos atrás, retornar erro com status
apropriado com mensagem "Sessão inválida"
Caso tudo esteja ok, retornar o usuário.
 */
