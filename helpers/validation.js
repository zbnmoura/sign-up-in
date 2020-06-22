const Joi = require('@hapi/joi');

const sign_in = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
        .required(),
    senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const sign_up = Joi.object({
    nome: Joi.string().alphanum().min(3).max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
        .required(),
    senha: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    telefones: Joi.array()
        .items(
            Joi.object({
                numero: Joi.string(),
                ddd: Joi.string().length(2),
            }),
        )
        .has(Joi.object({ numero: Joi.string(), ddd: Joi.string() })),
});

const user_by_id = Joi.object({
    id: Joi.string().guid(),
});

const schemes = {
    sign_in,
    sign_up,
    user_by_id,
};

const run_validation = async (func_name, args) => {
    await schemes[func_name].validateAsync(args);
    return true;
};

module.exports = { run_validation };
