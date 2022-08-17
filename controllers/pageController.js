const nodemailer = require("nodemailer");


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

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact',
    });
};

exports.sendMail = (req, res) => {
    const message = `
    <h1>Mail Details:</h1>
    <ul>
        <li>Name:  ${req.body.name}</li>
        <li>email: ${req.body.name}</li>
    </ul>

    <h1>Message:</h1>
    <p>${req.body.message}</p>
    `
};
