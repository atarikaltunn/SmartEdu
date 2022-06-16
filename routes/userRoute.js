const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authController.createUser); //post to localhost:3000/user/signup
router.route('/login').post(authController.loginUser); //post to localhost:3000/user/signup


module.exports = router;