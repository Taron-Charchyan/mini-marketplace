const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .min(6)
        .max(100)
        .required(),
    password: Joi.string()
        .min(8)
        .max(100)
        .required(),
});

const validateLogin = (req, res, next) => {
    const {error} = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        })
    }
    next();
}

module.exports = validateLogin;