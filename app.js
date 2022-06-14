const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoute');

const app = express();

//DB Connection
mongoose.connect('mongodb://localhost/my_database').then(() => {
    console.log('DB connection is successfull');
});

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port} at: `, new Date().toLocaleString());
});
