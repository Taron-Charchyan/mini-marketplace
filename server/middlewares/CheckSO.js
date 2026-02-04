const Product = require("../models/ProductSchema");

const checkSeller = (req, res, next) => {
    if (!req.user || req.user.role !== "seller") {
        return res.status(403).json({ message: "Access denied: sellers only" });
    }
    next();
};

const checkOwnership = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied: not your product" });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {checkSeller, checkOwnership};