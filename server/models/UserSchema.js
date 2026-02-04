const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, unique: true, trim: true},
        password: {type: String, required: true},

        role: {
            type: String,
            enum: ["seller", "buyer"],
            required: true
        },

        cart: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product"
                    },
                    quantity: {
                        type: Number,
                        default: 1
                    }
                }
            ],
            default: []
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);
