const mongoose = require('mongoose');
const db_uri = 'mongodb://localhost/prod';

const mongoose_connect = async (current_uri = db_uri) => {
    return await mongoose.connect(current_uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
};

const user_schema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.ObjectId, auto: true }, //auto
        ultimo_login: { type: Date, default: Date.now }, //auto
        nome: { type: String, required: true }, //user
        email: { type: String, required: true, lowercase: true, index: { unique: true } }, //user
        telefones: { type: Array, required: true }, //user
        senha: { type: String, required: true }, //hash
        token: { type: String }, //hash
    },
    {
        timestamps: {
            createdAt: 'data_criacao', //auto
            updatedAt: 'data_atualizacao', //auto
        },
    },
);

const User = mongoose.model('User', user_schema);

/** default functions */
//create
const save_document = async (args, db_uri_test) => {
    await mongoose_connect(db_uri_test);
    const document = await User.create(args);
    return document;
};

const update_user = async (args, db_uri_test) => {
    await mongoose_connect(db_uri_test);
    const doc = await User.updateOne(args);
    return doc;
};

//read
//update

(async () => {
    try {
        const sav = await save_document({
            nome: 'Soruzo marito',
            email: 'zbnmoura@gmail.com',
            senha: '123',
            token: '123',
            telefones: [{ numero: '12345', ddd: '123' }],
        });

        console.log({ sav });
    } catch (error) {
        console.error({ error });
    }
})();
