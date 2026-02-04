const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 400,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        images: [
            {
                type: String
            }
        ],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Product', ProductSchema);