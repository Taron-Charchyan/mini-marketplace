const Joi = require("joi");

const updateProductSchema = Joi.object({
    title: Joi.string().min(2).max(100).trim().optional().allow(''),
    description: Joi.string().min(10).max(400).optional().allow(''),
    price: Joi.number().min(0).optional().allow(''),
    stock: Joi.number().integer().min(0).optional().allow(''),
}).min(1)
    .messages({
        "object.min": "Provide at least one field to update"
    });

const validateUpdateProduct = (req, res, next) => {
    console.log("VALIDATION - Body:", req.body);
    console.log("VALIDATION - Files:", req.files);

    if (req.files && req.files.length > 0) {
        console.log("FILES PRESENT - Skipping body validation");
        return next();
    }

    const {error} = updateProductSchema.validate(req.body, {
        convert: true,
        stripUnknown: true
    });

    if (error) {
        console.log("VALIDATION ERROR:", error.details[0].message);
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    console.log("VALIDATION SUCCESS");
    next();
};

module.exports = validateUpdateProduct;