const express = require("express");
const router = express.Router();
const postController= require("../controllers/postController")
const authGuard=require("../middlewares/authMiddleware")
const adminGuard=require("../middlewares/authMiddleware")

router.post("/", authGuard, adminGuard, postController.createPost)
router.put("/:slug", authGuard, adminGuard, postController.updatePost)
router.delete("/:slug", authGuard, adminGuard, postController.deletePost)
router.get("/:slug", postController.getPost)
router.get("/", postController.getAllPosts)




module.exports = router;