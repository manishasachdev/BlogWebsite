const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      caption: { type: String, required: true },
      slug : { type: String, required: true, unique:true },
      body: { type: Object, required: true },
      photo: { type: String, required: false },
      user: { type: Schema.Types.ObjectId, ref: "User" },
        tags: { type: [String] },
      categories:[{type:Schema.Types.ObjectId, ref:"PostCategories"}]
    },
    {
      timestamps: true,toJSON:{virtuals:true}
    }
);
  
PostSchema.virtual("comments", {
    ref: "Comments",
    localField: "_id",
    foreignField:"post"
})

  const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

