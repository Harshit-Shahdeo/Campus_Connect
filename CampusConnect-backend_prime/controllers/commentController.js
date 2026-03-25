const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

const postComment = asyncHandler(async(req, res)=>{
    const {content} = req.body;
    const postId = req.params.postId;


    if(!content){
        res.status(400);
        throw new Error("comment body is required");
    }
    const comment = await Comment.create({
        content,
        user: req.user.user_id,
        post:postId
    });
res.status(200).json({comment});

    })

const getComment = asyncHandler(async(req, res)=>{
        const comment = await Comment.find({
            post:req.params.postId
        }).populate("user", "username");
        res.status(200).json({comment});
    });

const deleteComment = asyncHandler(async(req, res)=>{
    const comment = await Comment.findById(req.params.id);

    if(!comment){
        res.status(400);
        throw new Error("Comment not found");
    }
    if(comment.user.toString()!== req.user.user_id){
        res.status(403);
        throw new Error("User not authorized")
    }

    await comment.deleteOne();
    res.status(200).json({messge:"Comment deleted succesfully"})
});

module.exports = {postComment, getComment, deleteComment};