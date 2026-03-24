
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { category } = req.params;
        const { title, author, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const newPost = new Post({
            title,
            author,
            content,
            category
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPostsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const posts = await Post.find({
            category: { $regex: new RegExp(`^${category}$`, "i") }
        });

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};