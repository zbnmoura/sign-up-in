const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8081;

app.use(cors());

app.listen(port, () => console.log(`running on port: ${port}`));
// {
//     "mensagem": "mensagem de erro"
//     }
