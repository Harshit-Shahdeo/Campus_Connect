const mongoose = require("mongoose");
const reactionSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "user is required"]
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:[true,"post is required"]
    },
    type:{
        type:String,
        enum:["like", "dislike"],
        required:[true,"reaction is required"]
    }

},
{
    timestamps:true
});
reactionSchema.index({user:1, post:1}, {unique:true});
module.exports = mongoose.model("Reaction", reactionSchema);