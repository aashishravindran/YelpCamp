var express= require('express');
var app=express();
var bodyparser=require("body-parser");
var mongoose =require('mongoose');
var flash =require("connect-flash");
var Campground =require("./models/campgrounds")
var seedDB=require("./seeds");
var Comment   = require("./models/comment");
var LocalStrategy =require('passport-local');
var passportLocalMngoose =require('passport-local-mongoose');
var User= require("./models/user")
var passport=require("passport");
var methodoverride=require("method-override")
app.locals.moment = require('moment');


var campgroundRoutes=require("./routes/campgrounds");
var commentRoute=require("./routes/comments");
var AuthRoute=require("./routes/index");

//seedDB();

console.log(process.env.DATABASEURL)

let url = process.env.DATABASEURL || "mongodb://localhost/YelpCamp"; // fallback in case global var not working
mongoose.connect(url);

//mongoose.connect("mongodb://ash:aashish@ds153869.mlab.com:53869/yelpcamp_ash")
app.use(methodoverride("_method"))
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(flash());
//Passport Config 
app.use(require("express-session")({
    secret:"YelpCampSetupisGreat",
    resave:false,
    saveUninitialized:false
    
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});


app.use(AuthRoute);
app.use(campgroundRoutes);
app.use(commentRoute);
/// Schema Setup 

/*Campground.create({
    name:"Samon Creek",
    image:"http://www.theitravelgroup.com/wp-content/uploads/2016/03/MG_6391.jpg",
    description:"This a huge Place to explore Dark Secrets"
},function (err,Campground) {
 if(err){
     console.log(err)
 }
 else {
     console.log(Campground);
 }
})*/



/*
var campgrounds=[
       {name:"Samon Creek",image:"http://www.theitravelgroup.com/wp-content/uploads/2016/03/MG_6391.jpg"},
       {name:"Kashid", image:"https://res.cloudinary.com/dxqin8fbx/image/fetch/f_auto,q_auto:eco/http://d2847ql9t214mi.cloudfront.net/wp-content/uploads/2016/10/Camping-in-Kashid.jpg"},
       {name:"Sahara", image:"http://adventures365.in/blog/wp-content/uploads/2016/02/Best-Camping-Places-near-Mumbai-Pune.jpg"}
       ]*/

app.set("view engine","ejs");



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp has started");
})