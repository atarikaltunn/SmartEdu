const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

router.route('/signup').post(authController.createUser); //post to localhost:3000/users/signup
router.route('/login').post(authController.loginUser); //post to localhost:3000/users/login
router.route('/logout').get(authController.logoutUser); //get to localhost:3000/users/logout
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //get to localhost:3000/users/dashboard


module.exports = router;