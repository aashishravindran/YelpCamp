var express=require("express");
var router= express.Router();
var Campground =require("../models/campgrounds")
var Comment   = require("../models/comment");
var middleware =require("../middleware");


router.get("/campground/:id/comments/new",middleware.isloggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }
        else 
        {
           res.render("comments/new",{campground:campground}) 
        }
        
    })
    
})

router.post("/campground/:id/comments",middleware.isloggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
           res. redirect("/campground")
        }
        else 
        {
            
           Comment.create(req.body.comment,function(err,comment){
               if (err){
                   console.log(err)
               }
               else 
               {    
                   comment.author.id=req.user._id
                 comment.author.username=req.user.username
                   comment.save();
                   campground.comments.push(comment)
                   campground.save();
                   console.log( comment)
                   req.flash("success","Comment Successfully Created!");
                   res.redirect("/campground/"+campground._id)
               }
           })
        }
        
    })
    
    
})

router.get("/campground/:id/comments/:comments_id/edit",middleware.AuthorizeComments,function(req,res){
    
  //  res.send("comments Edit ")
  var campground=req.params.id;
    Comment.findById(req.params.comments_id,function(err, comment) {
        if(err){
            console.log(err)
        }
        else
        {
           res.render("comments/edit",{campground: req.params.id,comment:comment}) 
        }
    })
    
    
})


router.put("/campground/:id/comments/:comments_id",middleware.AuthorizeComments,function(req,res){
    Comment.findByIdAndUpdate(req.params.comments_id,req.body.comment,function(err,update){
        if(err){
            console.log(err)
        }
        else
        {
            console.lo
             res.redirect("/campground/"+req.params.id)
        }
    })
})

router.delete("/campground/:id/comments/:comments_id",middleware.AuthorizeComments,function(req,res){
    Comment.findByIdAndRemove(req.params.comments_id,function(err){
        if(err){
            console.log(err)
            res.redirect("/campground")
        }
         req.flash("error","Comment Deleted :(");
        res.redirect("/campground/"+req.params.id)
        
    })
})




    



module.exports=router;
