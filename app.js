const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('./models/user');
const  LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

// CONECTING TO DB
mongoose.connect('mongodb://localhost/auth_demo_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//FOR POST RNCODE
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// HOME ROUTE
app.get("/", function(req, res){
    res.render("home");
});

// SECRET ROUTE
app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log('The Server has started....');
});

