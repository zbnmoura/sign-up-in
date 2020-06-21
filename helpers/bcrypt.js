const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const hash_generator = async (senha) => {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(senha, salt);
    return hash;
};

module.exports = { hash_generator }

// (async () => {
//     try {
//         const sav = await hash_generator('1234'); //5eefd794fddd9bca8e896859

//         console.log({ sav });
//     } catch (error) {
//         console.error({ error });
//     }
// })();
