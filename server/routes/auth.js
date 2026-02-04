const express = require('express');
const AuthController = require("../controllers/AuthController");
const Auth = require("../middlewares/Auth");
const ValidRegister = require("../validations/ValidRegister");
const ValidLogin = require("../validations/ValidLogin");
const router = express.Router();

router.post('/register', ValidRegister, AuthController.register );
router.post('/login', ValidLogin, AuthController.login );
router.post('/deleteUser', Auth, AuthController.deleteUser );

module.exports = router;
