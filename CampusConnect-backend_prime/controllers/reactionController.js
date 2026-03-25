const asyncHandler = require("express-async-handler");
const Reaction = require("../models/reactionModel");

const reactToPost = asyncHandler(async(req, res)=>{
    const {type} = req.body;
    const userId = req.user.user_id;
    const postId = req.params.postId;

    if(!type){
        res.status(400);
        throw new Error("Type of reaction is required");
    }

    if(!["like","dislike"].includes(type)){
        res.status(400);
        throw new Error("Invalid reaction type")
    }

    let existingReaction = await Reaction.findOne({user:userId, post:postId});
    if(existingReaction){
    if(existingReaction.type === type){
        await existingReaction.deleteOne();
        return res.status(200).json({message:"reaction removed"})
    }else{
        existingReaction.type = type;
        await existingReaction.save();
        return res.status(200).json(existingReaction);
    }
    }

    let reaction = await Reaction.create({
        user:userId,
        post:postId,
        type
    });
    return res.status(201).json(reaction);
   
});

module.exports = {reactToPost};