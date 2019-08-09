var express=require("express");
var router= express.Router();
var Campground =require("../models/campgrounds")
var Comment   = require("../models/comment");
var middleware =require("../middleware");

router.get("/campground", function (req, res) {
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
        Campground.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {
                    campgrounds: allCampgrounds,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});


router.get("/campground/new",middleware.isloggedIn,function(req, res) {
    res.render("campgrounds/new");
})

router.post("/campground",middleware.isloggedIn,function(req,res){
    
        var name=req.body.name;
        var image=req.body.image;
        var desc=req.body.description;
        var price=req.body.price;
        var author={
            id: req.user._id,
            username: req.user.username
        }
        var newCampground={name: name,image: image ,price,description:desc,author:author};
       // campgrounds.push(newCampground);
       
       
       Campground.create(newCampground,function(err,newcreated){
           if(err){
               console.log(err);
           }
           console.log(newcreated);
          res.redirect("/campground");
       })
     //   res.redirect("/campground")
})

router.get("/campground/:id",function(req, res) {
  
  Campground.findById(req.params.id).populate("comments").exec(function(err,found){
      
      if(err){
          console.log(err)
      }
      else {
          console.log(found)
          res.render("campgrounds/show",{campground : found});
        
         }
      
  })
 
  
})


router.get("/campground/:id/edit",middleware.AuthorizeCampgrounds,function(req, res) {
    
    Campground.findById(req.params.id,function(err,foundCamogroud){
        if(err){
            console.log(err)
        }
        else {
          res.render("campgrounds/edit",{campground:foundCamogroud})  
        }
    })
    
})

router.put("/campground/:id",middleware.AuthorizeCampgrounds,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,update){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/campground/"+req.params.id)
        }
    })
})

router.delete("/campground/:id",middleware.AuthorizeCampgrounds,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err)
            res.redirect("/campground")
        }
        res.redirect("/campground")
        
    })
})




module.exports=router;