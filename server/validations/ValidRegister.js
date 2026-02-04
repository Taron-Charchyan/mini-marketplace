const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
            "string.pattern.base": "Name must contain only letters",
        }),

    email: Joi.string()
        .email()
        .min(6)
        .max(100)
        .required(),

    password: Joi.string()
        .min(8)
        .max(100)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#])[A-Za-z\d@$#]{8,}$/)
        .required()
        .messages({
            "string.pattern.base":
                "Password must contain uppercase, lowercase, number and special char (@, $, #)",
        }),

    role: Joi.string()
        .valid("buyer", "seller")
        .required(),
});

const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    next();
};

module.exports = validateRegister;
