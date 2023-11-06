const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        desc: { type: String, required: true },
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        check: { type: Boolean, default: false },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null
        },
        replyOnUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
     
    },
    {
      timestamps: true,toJSON:{virtuals:true}
    }
);
  
CommentSchema.virtual("replies", {
    ref: "Comments",
    localField: "_id",
    foreignField:"parent"
})


  const Comment = mongoose.model("Comments", CommentSchema);

   module.exports = Comment;
