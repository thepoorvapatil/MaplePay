var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    User                    = require("./models/user"),
   // Form                    = require("./models/form"),
    methodOverride          = require("method-override"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");
    
// var router = express.Router();

//mongoose.connect("mongodb://localhost:27017/maplepay", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://maplepaydbuser:xyz123password@maplepaycluster-sxpuz.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
   
// mongodb+srv://maplepaydbuser:xyz123password@maplepaycluster-sxpuz.mongodb.net/test?retryWrites=true&w=majority

var app = express();

app.set('view engine', 'ejs');

app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Oscar is the cutest dog in the world",
    resave : false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
//encoding session
passport.serializeUser(User.serializeUser());
//decodin session
passport.deserializeUser(User.deserializeUser());

//======================
//ROUTES
//======================
app.get("/", function(req, res){
    res.render("home");
});

app.get("/makerlogin", function(req,res){
    res.render("makerlogin");
});

app.get("/checkerlogin", function(req,res){
    res.render("checkerlogin");
});

app.post("/makerlogin", passport.authenticate("local", {
    successRedirect: "/makerinbox",
    failureRedirect: "/makerlogin"
}) , function(req, res){
});

app.post("/checkerlogin", passport.authenticate("local", {
    successRedirect: "/checkerinbox",
    failureRedirect: "/checkerlogin"
}) , function(req, res){
});

app.post("makerform", function(req, res){
    // res.render("/done");
    res.render("/makerinbox1");
});

app.post("checkerform", function(req, res){
    //res.render("/done");
    res.render("/checkerinbox1");
});

app.get("/checkerinbox",isLoggedInChecker ,function(req, res){
    res.render("checkerinbox")
});

app.get("/makerinbox", isLoggedInMaker,function(req, res){
    res.render("makerinbox")
});

app.get("/makerform", function(req, res){
    res.render("makerform");
});

app.get("/checkerform", function(req, res){
    res.render("checkerform");
});

app.get("/makerform1", function(req, res){
    res.render("makerform1");
});

app.get("/checkerform1", function(req, res){
    res.render("checkerform1");
});

app.get("/checkerinbox1",isLoggedInChecker ,function(req, res){
    res.render("checkerinbox1")
});

app.get("/makerinbox1", isLoggedInMaker,function(req, res){
    res.render("makerinbox1")
});

app.get("/makerworkdone", function(req,res){
    res.render("makerworkdone");
});

app.get("/makersendback", function(req,res){
    res.render("makersendback");
});

app.get("/checkerworkdone", function(req,res){
    res.render("checkerworkdone");
});

app.get("/checkersendback", function(req,res){
    res.render("checkersendback");
});
//=================
//AUTH ROUTES
//=================

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
        res.redirect("/");
    });
});
});

//=================
//EDIT 
//=================

app.get("/logout", function(req,res){
    req.logOut();
    res.redirect("/");
});

function isLoggedInMaker(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/makerlogin");
}
function isLoggedInChecker(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/checkerlogin");
}
var port = process.env.PORT || 3000;
app.listen(port, function () {
    
});
// app.listen(3000, function(){
//     console.log("MaplePay server has started...");
// })