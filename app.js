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

//SESION ENCRIPT
app.use(require("express-session")({
    secret: "Your deed is where your belong",
    resave: false,
    saveUninitialized:false
}));

//FOR POST RNCODE
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================
// ROUTES
//==================

// HOME ROUTE
app.get("/", function(req, res){
    res.render("home");
});

// SECRET ROUTE
app.get("/secret",isLoggIn, function(req, res){
    res.render("secret");
});

// REGISTER
app.get("/register", function(req,res){
    res.render("register");
})
// HANDLING USER SIGNUP FORM
app.post("/register", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});

// LOGIN
app.get("/login", function(req,res) {
    res.render("login");
});
// HANDLING LOGIN FORM
app.post("/login", passport.authenticate('local' , {
    successRedirect:"/secret",
    failureRedirect: "/login"
}), function(req,res) {
    
});

// LOGOUT
app.get("/logout", function(req,res) {
    req.logout();
    res.redirect("/");
});

function isLoggIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/");
    }
}
app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log('The Server has started....');
});

