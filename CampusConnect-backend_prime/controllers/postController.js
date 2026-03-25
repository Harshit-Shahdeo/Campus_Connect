const asyncHandler = require("express-async-handler");
const Post = require("../models/PostModel");
const Reaction = require("../models/reactionModel");

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("author", "username")

    const updatedPost = await Promise.all(posts.map(async(post)=>{
        const likesCount =await Reaction.countDocuments({
            post:post._id,
            type:"like"
        });

        const dislikeCount = await Reaction.countDocuments({
            post:post._id,
            type:"dislike"
        });

        let userReaction = null;

        if(req && req.user){
            const reaction = await Reaction.findOne({
                post:post._id,
                user:req.user.user_id
            })
            if(reaction){
                userReaction = reaction.type
            }
        }
        return {
            ...post.toObject(),
            likesCount,
            dislikeCount,
            userReaction
        };
    }))
    res.status(200).json(updatedPost);
});

const PostPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const slug = title.toLowerCase().split(" ").join("-") + "-" + Date.now();
    const post = await Post.create({
        title,
        content,
        slug,
        author: req.user.user_id
    });
    res.status(201).json(post);
});

const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate("author", "username")
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    
        const likesCount =await Reaction.countDocuments({
            post:post._id,
            type:"like"
        });

        const dislikeCount = await Reaction.countDocuments({
            post:post._id,
            type:"dislike"
        });

        let userReaction = null;

        if(req && req.user){
            const reaction = await Reaction.findOne({
                post:post._id,
                user:req.user.user_id
            })
            if(reaction){
                userReaction = reaction.type
            }
        }
        res.status(200).json({
        ...post.toObject(),
        likesCount,
        dislikeCount,
        userReaction

    })
});



const updatePostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    
    if (post.author.toString() !== req.user.user_id) {
        res.status(403);
        throw new Error("User don't have permission to update other user posts");
    }

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedPost);
});

const deleteById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (post.author.toString() !== req.user.user_id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user posts");
    }

    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post deleted successfully" });
});

module.exports = { getPosts, getPostById, PostPost, updatePostById, deleteById };