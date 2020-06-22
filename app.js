const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;
const sign = require('./routes/sign');
const user = require('./routes/users');

app.use(cors());
app.use('/sign', sign);
app.use('/users', user);

//pega todas as rotas "nao existentes"
app.get('*', (req, res) => {
    return res.json({ message: 'nt' });
});

app.listen(port, () => console.log(`running on port: ${port}`));

//TODO get se o email ja existe na base //"E-mail já existente" (signup)
//TODO tratar erros do mongoose na rota

//TODO validar todos http
