const express = require("express");
const router = express.Router();

const{ raectToPost, reactToPost } = require("../controllers/reactionController");
const validateToken = require("../middleware/validateToken");

router.post("/posts/:postId/react", validateToken, reactToPost);
module.exports = router;