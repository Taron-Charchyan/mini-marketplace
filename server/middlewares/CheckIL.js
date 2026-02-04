const Product = require("../models/ProductSchema");

const checkImageLimit = async (req, res, next) => {
    try{
        const {id} = req.params;
        const limit = 10;

        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: 'Product not found.'});
        }

        const currentImagesCount = product.images ? product.images.length : 0;
        const newImagesCount = req.files ? req.files.length : 0;

        const totalImages = currentImagesCount + newImagesCount;

        console.log(`Current: ${currentImagesCount}, New: ${newImagesCount}, Total: ${totalImages}`);

        if(totalImages > limit){
            return res.status(400).json({
                message: `Cannot add ${newImagesCount} images. Product already has ${currentImagesCount} images. Maximum allowed is ${limit}.`
            });
        }

        next();
    }catch(err){
        console.error("CHECK IMAGE LIMIT ERROR:", err);
        res.status(500).json({
            message: "Failed to check image limit",
            error: err.message
        });
    }
};

module.exports = {checkImageLimit};