const Product = require("../models/ProductSchema");

class ProductController {
    static addProduct = async (req, res) => {
        try {
            const {title, description, price, stock} = req.body;
            const seller = req.user.id;

            let imagePaths = [];
            if (req.files && req.files.length > 0) {
                imagePaths = req.files.map(file => `/uploads/products/${file.filename}`);
            }

            const product = new Product({
                title,
                description,
                price,
                images: imagePaths,
                stock,
                seller
            });

            await product.save();

            res.status(201).json({
                message: "Product created successfully",
                product
            });
        } catch (err) {
            console.error("Create product error:", err);
            res.status(500).json({
                message: "Failed to create product",
                error: err.message
            });
        }
    }

    static getAllProducts = async (req, res) => {
        try {
            const page = Math.max(Number(req.query.page) || 1, 1);
            const limit = Math.max(Number(req.query.limit) || 5, 1);
            const skip = (page - 1) * limit;

            const total = await Product.countDocuments()

            const products = await Product.find({})
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit)
                .populate("seller", "name")

            res.status(200).json({
                products,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalProducts: total
            });
        } catch (err) {
            res.status(500).json({
                message: "Failed to get all products",
                error: err.message
            })
        }
    }

    static getById = async (req, res) => {
        try {
            const {id} = req.params
            const product = await Product.findById(id).populate("seller", "name");
            if (!product) {
                return res.status(404).json({message: "Product not found"});
            }
            res.status(200).json({
                message: "Product found",
                product
            })
        } catch (err) {
            res.status(500).json({
                message: "Failed to get product",
                error: err.message
            })
        }
    }

    static getMyProducts = async (req, res) => {
        try {
            const { id } = req.user;

            const products = await Product.find({ seller: id }).sort({createdAt: -1});

            return res.status(200).json({
                products,
                count: products.length,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Failed to fetch products",
            });
        }
    };


    static updateProduct = async (req, res) => {
        try {
            const {id} = req.params;

            const updateData = {};

            if (req.body.title) updateData.title = req.body.title;
            if (req.body.description) updateData.description = req.body.description;
            if (req.body.price !== undefined) updateData.price = req.body.price;
            if (req.body.stock !== undefined) updateData.stock = req.body.stock;

            if (req.files && req.files.length > 0) {
                updateData.images = req.files.map(file => `/uploads/products/${file.filename}`);
            }

            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({message: "Nothing to update"});
            }

            const product = await Product.findByIdAndUpdate(
                id,
                updateData,
                {new: true}
            );

            if (!product) {
                return res.status(404).json({message: "Product not found"});
            }

            res.status(200).json({
                message: "Product updated successfully",
                product
            });
        } catch (err) {
            res.status(500).json({
                message: "Failed to update product",
                error: err.message
            });
        }
    };

    static addImages = async (req, res) => {
        try {
            const {id} = req.params;

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({message: "No images provided"});
            }

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({message: "Product not found"});
            }

            if (!product.images) {
                product.images = [];
            }

            const newImages = req.files.map(
                file => `/uploads/products/${file.filename}`
            )
            product.images.push(...newImages);

            await product.save()

            res.status(200).json({
                message: "Images added successfully",
                product
            })

        } catch (err) {
            res.status(500).json({
                message: "Failed to add images",
                error: err.message
            });
        }
    }

    static deleteImages = async (req, res) => {
        try {
            const {id} = req.params;
            const {images} = req.body;

            if (!images || !Array.isArray(images) || images.length === 0) {
                return res.status(400).json({message: "Provide images array to delete"});
            }

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({message: "Product not found"});
            }

            const fs = require("fs").promises;
            const path = require("path");

            await Promise.all(
                images.map(async (imagePath) => {
                    const fullPath = path.join(__dirname, "..", "public", imagePath);

                    try {
                        await fs.access(fullPath)
                        await fs.unlink(fullPath);
                    } catch (err) {
                        console.warn("File not found or already deleted:", fullPath);
                    }
                })
            )

            product.images = product.images.filter(img => !images.includes(img));
            await product.save();

            res.status(200).json({
                message: "Images deleted successfully",
                product
            })
        } catch (err) {
            res.status(500).json({
                message: "Failed to delete images",
                error: err.message
            });
        }
    }

    static deleteProduct = async (req, res) => {
        try {
            const {id} = req.params;

            const deleted = await Product.findByIdAndDelete(id)

            if (!deleted) {
                return res.status(404).json({message: 'Product not found'});
            }

            res.status(200).json({message: "Product deleted"});
        } catch (err) {
            res.status(500).json({
                message: "Failed to delete product",
                error: err.message
            })
        }
    }
}

module.exports = ProductController;