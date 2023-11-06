const Post = require("../models/Post");
const uploadPicture = require("../middlewares/UploadMiddlewarePicture");
const fileRemover = require('../utils/fileRemoves')
const { v4: uuidv4 } = require('uuid');
const Comment= require('../models/Comment')



exports.createPost = async (req, res) => {
  try {
      
      // const post = new Post({
      //   title: 'sample title',
      //   caption: 'sample caption',
      //   slug: uuidv4(),
      //   body: {
      //     type: "doc",
      //     content:[]
      //   },
      //   photo: '',
      //   user:req.user._id
      // })
      // const createdPost = await post.save();
      // return res.json(createdPost);
    

      const postData = req.body;
console.log('POST ',postData )
      // Create a new Post instance with the data
      const post = new Post(postData);
  
      const createdPost = await post.save();
      return res.json(createdPost);
    }
    catch (error) {
        console.error("Error in Creating post:", error);
  
      res.status(500).json({
        status: "error",
        message: "Error in Creating post",
      });
    }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
    
     if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
      
     }
    
     const { title, caption, slug, body, tags, categories } = req.body;

    // Update the post properties if they are provided in the request body
    if (title) post.title = title;
    if (caption) post.caption = caption;
    if (slug) post.slug = slug;
    if (body) post.body = body;
    if (tags) post.tags = tags;
    if (categories) post.categories = categories;

    // Save the updated post
    const updatedPost = await post.save();

    res.status(200).json({
      status: "success",
      message: "Post updated successfully",
      data: updatedPost,
    });

    //   const handleUpdatedPostData = async (data) => {
    //     const { title, caption, slug, body, tags, categories } = JSON.parse(data);
    //     post.title = title || post.title;
    //     post.caption = caption || post.caption;
    //     post.slug = slug || post.slug;
    //     post.body = body || post.body;
    //     post.tags = tags || post.tags;
    //     post.categories = title || post.categories;
    //     const updatedPost = await post.save();
    //     return res.json(updatedPost);
    //   }
    //  const hi= handleUpdatedPostData(req.body.document)
    //   console.log('Hi', hi)
  // }
  }
  catch (error) {
      console.error("Error in updating post:", error);

    res.status(500).json({
      status: "error",
      message: "Error in Creating post",
    });
  }
}
  

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug })

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
      
     }
    
    await Comment.deleteMany({ post: post._id });
    return res.json({
      message:"Post is successfully deleted"
    })
    

   
  }
  catch (error) {
      console.error("Error in updating post:", error);

    res.status(500).json({
      status: "error",
      message: "Error in deleting post",
    });
  }
}
  
// to get particular post and it sdetail based on slug id 
exports.getPost = async (req, res) => {

  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([{
      path: 'user',
      select:["avtar", "name"]
    },
      {
      path: "comments",
      match: {
        check: true,
        parent:null
        },
        populate: [
          {
            path: "user",
            select:["avtar", "name"]
          },
          {
            path: 'replies',
            match: {
              check: true,
             
              },
          }
      ]

      },

    ])

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }
    return res.json(post)
  }
  catch (err) {
    console.log('err', err)
    res.status(500).json({
      status: "error",
      message: "Error getting post",
    });
  }
}

// to get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate([
      {
      path: "user",
        select:["avtar", "name", "verified"]
      }
    ])
    res.json(posts)
  }
  catch {
    res.status(500).json({
      status: "error",
      message: "Error in getting all post",
    });
  }
}