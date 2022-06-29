const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/').post(roleMiddleware(['teacher', 'admin']), courseController.createCourse); //post to localhost:3000/courses
router.route('/').get(courseController.getAllCourses); //get to localhost:3000/courses
router.route('/:slug').get(courseController.getCourse); //get to localhost:3000/courses/:id
router.route('/enroll').post(courseController.enrollCourse); //get to localhost:3000/courses
router.route('/release').post(courseController.releaseCourse); //get to localhost:3000/courses

module.exports = router;
