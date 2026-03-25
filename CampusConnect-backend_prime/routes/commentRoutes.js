const express = require("express");
const router = express.Router();

const {postComment, getComment, deleteComment } = require("../controllers/commentController");
const validateToken = require("../middleware/validateToken");

router.post("/posts/:postId/comments", validateToken,  postComment);
router.get("/posts/:postId/comments",  getComment);
router.delete("/:id", validateToken, deleteComment);

module.exports = router;

