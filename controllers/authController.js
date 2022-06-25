const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

//creates a user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

//check if name and password are correct
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (err) {
                    console.log(err);
                }
                if (same) {
                    req.session.userID = user._id;
                    res.status(200).redirect('/users/dashboard');
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

//logouts user
exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

//returns personal dashbard page
exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID });
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses
    });
};
