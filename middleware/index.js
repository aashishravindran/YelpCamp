//all middle ware goes here 
var Campground =require("../models/campgrounds")
var Comment   = require("../models/comment");


var middlewareObj={}
middlewareObj.AuthorizeCampgrounds=function (req,res,next){
    if(req.isAuthenticated()){
        console.log("true")
            Campground.findById(req.params.id,function(err,foundCamogroud){
                if(err){
                    req.flash("error","Campground Not Found");
                    console.log("true No error")
                    console.log(err)
                }
                else{
                    if (!foundCamogroud) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                if(foundCamogroud.author.id.equals(req.user._id)){
                    console.log("true Campground Found")
                    return next();
                }
                else {
                    console.log("true")
                    req.flash("error","Permission Denied");
                    res.redirect("back")
                }
                }
                
            })
        
        
    }
    else {
    req.flash("error","You Need to Login to do That!!");
    res.redirect("back")
    }
}

 middlewareObj.isloggedIn=  function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else 
    {   req.flash("error","Please Login First!")
        res.redirect("/login")
    }
}


middlewareObj.AuthorizeComments=function(req,res,next){
 if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, function(err, foundComment){
           if(err){
               console.log("My Error" +err)
               res.redirect("back");
           }  else {
                if (!foundComment) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
               console.log(foundComment)
            if(foundComment.author.id.equals(req.user._id)) {
                console.log("found Comment");
                return next();
            } else {
                req.flash("error","Permission Denied");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error","Please Login First!")
        res.redirect("back");
    }
}

module.exports=middlewareObj;