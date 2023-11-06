const express = require("express");
const router = express.Router();

const commentController=require("../controllers/commentsController")
const authGuard=require("../middlewares/authMiddleware")
const adminGuard=require("../middlewares/authMiddleware")

router.post("/", authGuard, commentController.createComment)
router.put("/:commentId", authGuard, commentController.updateComment)
router.delete("/:commentId", authGuard, commentController.deleteComment)



module.exports = router;