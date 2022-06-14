const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.route('/').post(courseController.createCourse); //post to localhost:3000/courses
router.route('/').get(courseController.getAllCourses); //get to localhost:3000/courses
router.route('/:slug').get(courseController.getCourse); //get to localhost:3000/courses/:id

module.exports = router;