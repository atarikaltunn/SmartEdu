//a middleware to ensure unauthenticated users will be not able to reach dashboard page

const User = require('../models/User');

module.exports = (req, res, next) => {
    User.findById(req.session.userID, (err, user) => {
        //there is an error occurs if we do not use return instead of using return
        if (err || !user) return res.redirect('/login');
        next();
    });
};
