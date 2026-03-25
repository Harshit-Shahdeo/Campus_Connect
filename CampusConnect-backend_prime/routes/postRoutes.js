const express = require("express");
const router = express.Router();
const { getPosts, PostPost, updatePostById, deleteById, getPostById } = require("../controllers/postController");
const validateToken = require("../middleware/validateToken");


router.route("/").get(getPosts).post(validateToken,PostPost);
router.route("/:id").get(getPostById).put(updatePostById).delete(deleteById);

module.exports = router;