const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
    {
        content:{
            type:String,
            required:[true, "Comment cannot be empty"]
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

            required:[true, "user details are required"]
        },
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required:[true, "Post is required for commenting"]
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Comment", CommentSchema);