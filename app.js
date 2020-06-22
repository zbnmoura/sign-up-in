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
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Endpoint não encontrado' });
});

app.listen(port, () => console.log(`running on port: ${port}`));
