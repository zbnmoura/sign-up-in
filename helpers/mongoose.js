const mongoose = require('mongoose');
const db_uri = 'mongodb://localhost/prod';

const { hash_compare, hash_generator } = require('./bcrypt');

const mongoose_connect = async (current_uri = db_uri) => {
    return await mongoose.connect(current_uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
};

const user_schema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String },
        phones: { type: Array },
        token: { type: String },
        last_login: { type: Date, default: Date.now },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const User = mongoose.model('User', user_schema);

const save_document = async (args, db_uri_test) => {
    const { name, email, phones, password } = args;
    await mongoose_connect(db_uri_test);

    const hash_password = await hash_generator(password);
    const token = await hash_generator(email);
    const document = await User.create({ name, email, phones, password: hash_password, token });
    return document;
};

module.exports = { save_document };
// findOne

// (async () => {
//     try {
//         const sav = await save_document({
//             nome: 'Soruzo maritssss',
//             email: 'zbnmouro@gmail.com',
//             senha: '123',
//             token: '123',
//             telefones: [{ numero: '12345', ddd: '123' }],
//         }); //5eefd794fddd9bca8e896859

//         console.log(sav);
//     } catch (error) {
//         console.error({ error });
//     }
// })();
