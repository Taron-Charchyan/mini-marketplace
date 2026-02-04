const express = require('express');
const CartController = require("../controllers/CartController");
const Auth = require("../middlewares/Auth");
const router = express.Router();

router.put('/add/:id', Auth, CartController.addToCart);

module.exports = router;
