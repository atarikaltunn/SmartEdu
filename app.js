const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')

const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//DB Connection
mongoose.connect('mongodb://localhost/my_database').then(() => {
    console.log('DB connection is successfull');
});

//Template Engine
app.set('view engine', 'ejs');

//Global Variable
global.userIN = false;

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
    session({
        secret: 'my_keyboard_cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: 'mongodb://localhost/my_database' })

    })
);
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});

//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port} at: `, new Date().toLocaleString());
});
