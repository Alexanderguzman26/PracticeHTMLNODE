const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
router.post('/login', loginController.login);
router.post('/register', registerController.register);

module.exports = router;
