const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const hash_generator = async (password) => {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return hash;
};

const hash_compare = async (args) => {
    const { incoming_password, doc_password } = args;
    return await bcrypt.compare(incoming_password, doc_password);
};

module.exports = { hash_generator, hash_compare };
