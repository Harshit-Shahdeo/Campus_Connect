const mongoose = require("mongoose");
const Postschema = mongoose.Schema({
   
     title:{
        type:String,
        required:[true, "Title is Required"],
        trim: true
     },

     slug:{
        type:String,
        
        
     },
     content:{
        type:String,
        required:[true, "Content is required"]
     },
     author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "Author is requierd"]
     }
},
{
    timestamps:true
});

module.exports = mongoose.model("Post", Postschema);