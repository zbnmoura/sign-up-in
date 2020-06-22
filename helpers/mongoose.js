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

const create_document = async (args, db_uri_test) => {
    const { name, email, phones, password } = args;
    await mongoose_connect(db_uri_test);

    const hash_password = await hash_generator(password);
    const token = await hash_generator(email);
    const document = await User.create({ name, email, phones, password: hash_password, token });
    return document;
};

const find_by_email = async (email) => {
    await mongoose_connect(db_uri_test);
    const document = await User.findOne({ email });
    return document;
};

const find_email_password = async (args, db_uri_test) => {
    const { email, password } = args;

    const document = await find_by_email(email);
    //se o email existir
    if (document !== null) {
        const status = await hash_compare({ incoming_password: password, doc_password: document.password });
        //se a senha for verdadeira
        if (status === true) {
            return document;
        } else {
            //senha incorreta
            return null;
        }
    } else {
        //email nao existente
        return null;
    }
};

const find_by_id = async (id, db_uri_test) => {
    await mongoose_connect(db_uri_test);
    return await User.findById(id);
};
module.exports = { create_document, find_email_password, find_by_id, find_by_email };
