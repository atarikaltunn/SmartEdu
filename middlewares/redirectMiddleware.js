//a middleware to ensure authenticated users will be not able to reach login/signup pages


module.exports = (req, res, next) => {
    if (req.session.userID) return res.redirect('/');
    next();
};
