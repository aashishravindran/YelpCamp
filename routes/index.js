var express=require("express");
var router= express.Router();
var Campground =require("../models/campgrounds")
var Comment   = require("../models/comment");
var passport=require("passport");
var User= require("../models/user")
//var connectFlash =require("connect-flash");




router.get("/",function(req,res){
   res.render("landing");
})

//=====================
//Comment Route
//====================


//Auth Routes

router.get("/register",function(req, res) {
    res.render("register")
})

router.post("/register",function(req, res) {
    var username=req.body.username;
    var password=req.body.password;
    var newUser= new User({username:username})
    User.register(newUser, password,function(err,user){
        if(err){
           // console.log(err)
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome To Yelp Camp " +user.username);
            res.redirect("/campground");
        })
    })
})


router.get("/login",function(req, res) {
       res.render("login"); 
       
});


router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/campground",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});

/*
router.post("/login", passport.authenticate("local",{
    successRedirect:"/campground",
    failureRedirect:"/login"
}),function(req,res){
    //req.flash("success","Logged You In",currentUser.username)
   })
   */

router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged You Out");
    res.redirect("/");
})




module.exports=router;