const Joi = require("joi");

const productSchema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(100)
        .trim()
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 2 characters",
            "string.max": "Title must be less than 100 characters",
        }),

    description: Joi.string()
        .min(10)
        .max(400)
        .required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description must be less than 400 characters",
        }),

    price: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.min": "Price cannot be negative",
        }),

    stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Stock must be a number",
            "number.integer": "Stock must be an integer",
            "number.min": "Stock cannot be negative",
        }),
});

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body, { convert: true });

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    next();
};

module.exports = validateProduct;