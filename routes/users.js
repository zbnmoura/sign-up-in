/**
 * Chamadas para este endpoint devem conter um header na requisição de
Authentication com o valor "Bearer {token}" onde {token} é o valor do token
passado na criação ou sign in de um usuário.
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