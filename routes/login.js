// sign up

/**
 * Usar status codes de acordo
Em caso de sucesso irá retornar um usuário mais os campos:
id: id do usuário (pode ser o próprio gerado pelo banco, porém seria interessante
se fosse um GUID)
data_criacao: data da criação do usuário
data_atualizacao: data da última atualização do usuário
ultimo_login: data do último login (no caso da criação, será a mesma que a
criação)
token: token de acesso da API (pode ser um GUID ou um JWT)
Caso o e-mail já exista, deverá retornar erro com a mensagem "E-mail já
existente".
O token deverá ser persistido junto com o usuário
 */

// {
//     "nome": "string",
//     "email": "string",
//     "senha": "senha",
//     "telefones": [
//     {
//     "numero": "123456789",
//     "ddd": "11"
//     }
//     ]
//     }


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