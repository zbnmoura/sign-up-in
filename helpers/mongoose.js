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
const user_schema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.ObjectId, auto: true },
        nome: { type: String, lowercase: true },
        email: { type: String, lowercase: true, trim: true },
        senha: String,
        token: String,
        telefones: [], //FIXME ver a possibilidade de modelar o numero e ddd
        ultimo_login: { type: Date, default: Date.now },
    },
    {
        timestamps: {
            createdAt: 'data_criacao',
            updatedAt: 'data_atualizacao',
        },
    },
);

const User = mongoose.model('User', user_schema);

//create
const save_doc = async (args, db_uri_test) => {
    await mongoose_connect(db_uri_test);
    const { id: _id, nome, email, senha, token, telefones } = await User.create(args);
    return { id: _id, nome, email, senha, token, telefones };
};
//read
//update

(async () => {
    try {
        const x = await save_doc({
            nome: 'BrUnO',
            email: 'zbnmoura@gmail.com',
            senha: '123',
            token: '123',
            telefones: [{ numero: '12345', ddd: '123' }],
        });
        console.log(x);
    } catch (error) {
        console.error({ error });
    }
})();
