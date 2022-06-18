//renders index/main page
exports.getIndexPage = (req, res) => {
    console.log(req.session.userID);
    res.status(200).render('index', {
        page_name: 'index',
    });
};

//renders about page
exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: 'about',
    });
};

//renders register page
exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: 'register',
    });
};

//renders login page
exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login',
    });
};
