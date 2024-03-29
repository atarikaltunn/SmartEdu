const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');

//creates course
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID,
        });
        res.status(201).redirect('/courses');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

//returns all courses
exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories;
        const category = await Category.findOne({ slug: categorySlug });
        const search = req.query.search;

        let filter = {};
        if (categorySlug) {
            filter = { category: category._id };
        }

        if (search) {
            filter = { name: search };
        }

        if (!search && !categorySlug) {
            filter.name = '';
            filter.category = null;
        }

        const courses = await Course.find({
            $or: [{ name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
                  { category: filter.category }],
        }).sort('-createdAt');
        const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

//return only a course
exports.getCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({ slug: req.params.slug }).populate('user');
        const categories = await Category.find();

        res.status(200).render('course', {
            course,
            page_name: 'courses',
            user,
            categories
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

//a function to enroll course
exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.push({ _id: req.body.course_id });
        await user.save();
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

//a function to release course
exports.releaseCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.pull({ _id: req.body.course_id });
        await user.save();

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
