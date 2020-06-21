const mongoose = require('mongoose');
const db_uri = 'mongodb://localhost/prod';

const mongoose_connect = async (current_uri = db_uri) => {
    return await mongoose.connect(current_uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
};

//timestamp: data_criacao, data_atualizacao, ultimo_login(first = data_criação)
//token: jwt
//email unique: get ou fazer "unique"
const user_schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    nome: String,
    email: String,
    senha: String,
    token:String,
    telefones: ['numero','ddd'], //FIXME ver a possibilidade de modelar o numero e ddd
});

//create
//read
//update

const User = mongoose.model('User', user_schema);




// (async () => {
//     try {
//       
//     } catch (error) {
//         console.error({ error });
//     }
// })();
