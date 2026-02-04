const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const Auth = require("../middlewares/Auth");
const upload = require("../config/multer");
const ValidProduct = require("../validations/ValidProduct");
const ValidPrUpdate = require("../validations/ValidPrUpdate");
const { checkSeller, checkOwnership } = require("../middlewares/CheckSO");
const {checkImageLimit} = require("../middlewares/CheckIL");

router.post('/add',
    Auth,
    upload.array('images', 10),
    ValidProduct,
    checkSeller,
    ProductController.addProduct
);

router.put('/update/:id',
    Auth,
    upload.array('images', 10),
    ValidPrUpdate,
    checkSeller,
    checkOwnership,
    ProductController.updateProduct
);

router.put('/add-images/:id',
    Auth,
    checkSeller,
    checkOwnership,
    upload.array('images', 10),
    checkImageLimit,
    ProductController.addImages
);

router.delete('/delete-images/:id',
    Auth,
    checkSeller,
    checkOwnership,
    ProductController.deleteImages
);

router.delete('/delete/:id',
    Auth,
    checkSeller,
    checkOwnership,
    ProductController.deleteProduct
);

router.get('/getAll', Auth, ProductController.getAllProducts);
router.get('/getById/:id', Auth, ProductController.getById);
router.get('/my', Auth, checkSeller, ProductController.getMyProducts)
module.exports = router;