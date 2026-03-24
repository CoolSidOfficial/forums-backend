import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    category: String, 
}, { timestamps: true });


 const Post = mongoose.model("Post", PostSchema);
export default Post; 