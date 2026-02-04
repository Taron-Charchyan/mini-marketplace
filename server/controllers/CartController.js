const Product = require("../models/ProductSchema");
const User = require("../models/UserSchema");

class CartController {
    static addToCart = async (req, res) => {
        try {
            const {id} = req.params;
            const {quantity} = req.body;

            const qtyToAdd = parseInt(quantity);
            if (isNaN(qtyToAdd) || qtyToAdd <= 0) {
                return res.status(400).json({error: "Invalid quantity"});
            }

            const [product, user] = await Promise.all([
                Product.findById(id),
                User.findById(req.user.id)
            ]);

            if (!product) return res.status(404).json({ error: "Product not found" });
            if (!user) return res.status(404).json({ error: "User not found" });

            const itemIndex = user.cart.findIndex(item =>
                item.productId.toString() === id
            );

            if (itemIndex > -1) {
                const newQuantity = user.cart[itemIndex].quantity + qtyToAdd;

                if (newQuantity > product.stock) {
                    return res.status(400).json({
                        error: `Insufficient stock. Only ${product.stock} items available.`
                    });
                }

                user.cart[itemIndex].quantity = newQuantity;
            } else {
                if (qtyToAdd > product.stock) {
                    return res.status(400).json({
                        error: `We only have ${product.stock} items in stock.`
                    });
                }

                user.cart.push({productId: id, quantity: qtyToAdd});
            }

            await user.save()

            res.status(itemIndex > -1 ? 200 : 201).json({
                message: "Successfully added to cart",
                cart: user.cart,
                count: user.cart.length
            });
        } catch (err) {
            return res.status(500).json({
                message: "Failed to add to cart",
                error: err.message
            });
        }
    }

    static removeFromCart = async (req, res) => {
        try {
            const {id} = req.params;

            const user = await User.findByIdAndUpdate(
                req.user.id,
                {$pull: {cart: {productId: id}}},
                {new: true}
            );

            if (!user) {
                return res.status(404).json({error: "User not found"});
            }

            return res.status(200).json({
                message: "Removed successfully",
                cart: user.cart
            })
        } catch (err) {
            return res.status(500).json({
                message: "Unable to remove from cart.",
                error: err.message
            });
        }
    }

    static buy = async (req, res) => {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const qtyToBuy = parseInt(quantity);

            if (isNaN(qtyToBuy) || qtyToBuy <= 0) {
                return res.status(400).json({ error: "Invalid quantity" });
            }

            const [product, user] = await Promise.all([
                Product.findById(id),
                User.findById(req.user.id)
            ]);

            if (!product) return res.status(404).json({ error: "Product not found" });
            if (!user) return res.status(404).json({ error: "User not found" });

            if (product.stock < qtyToBuy) {
                return res.status(400).json({ error: `Not enough stock. Available: ${product.stock}` });
            }

            product.stock -= qtyToBuy;
            await product.save();

            user.cart = user.cart.filter(item => item.productId.toString() !== id);
            await user.save();

            return res.status(200).json({
                message: "Purchase successful",
                remainingStock: product.stock,
                cart: user.cart
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = CartController;