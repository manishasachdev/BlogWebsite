const Post = require("../models/Post");
const uploadPicture = require("../middlewares/UploadMiddlewarePicture");
const fileRemover = require('../utils/fileRemoves')
const { v4: uuidv4 } = require('uuid');
const Comment= require('../models/Comment')



exports.createComment = async (req, res) => {
    try {
      const { desc, slug, parent, replyOnUser } = req.body;
      const post = await Post.findOne({ slug: slug });

      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
        
      }
      const newComment = new Comment({
        user: req.user._id,
        desc,
        post: post._id,
        parent,
        replyOnUser
      });
      const savedComment = await newComment.save();
      return res.json(savedComment);
    
    }
    catch (error) {
        console.error("Error in Creating post:", error);
  
      res.status(500).json({
        status: "error",
        message: "Error in Creating comment",
      });
    }
}

exports.updateComment = async (req, res) => {
  try {
    const { desc } = body;
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "comment not found",
      });
      
    }
    comment.desc = desc || comment.desc;
    const updatedComment = await comment.save();
    return res.json(updatedComment);

  }
  catch {
    res.status(500).json({
      status: "error",
      message: "Error in updating comment",
    });
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    await Comment.deleteMany({ parent: comment._id });

    if (!comment) {
      return res.status(404).json({
        status: "error",
        message: "comment not found",
      });
    }
    return res.json({
      message: 'comment is deleted successfully'
    })


  } catch {
    res.status(500).json({
      status: "error",
      message: "Error in deleting comment",
    });
  }
}