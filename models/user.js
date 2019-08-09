var mongoose=require("mongoose")
var passportLocalMngoose =require('passport-local-mongoose');

var userSchema= new mongoose.Schema({
    username:String,
    password:String
})


userSchema.plugin(passportLocalMngoose);
module.exports=mongoose.model("User",userSchema)