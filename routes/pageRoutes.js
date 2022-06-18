const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage); //get to localhost:3000/
router.route('/about').get(pageController.getAboutPage); //get to localhost:3000/about
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage); //get to localhost:3000/register
router.route('/login').get(redirectMiddleware, pageController.getLoginPage); //get to localhost:3000/login

module.exports = router;
