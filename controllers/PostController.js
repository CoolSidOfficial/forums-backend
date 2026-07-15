import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { category } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Missing fields"
            });
        }

        const newPost = new Post({
            title,
            author: req.user._id,
            content,
            category
        });

        await newPost.save();

        res.status(201).json(newPost);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};
export const getPostsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const posts = await Post.find({
            category: { $regex: new RegExp(`^${category}$`, "i") }
        }).sort({ createdAt: -1 }); // newest first

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// NEW
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};
export const getTrendingPosts = async (req, res) => {
  try {

    const posts = await Post.find()
      .sort({
        likes: -1,
        commentsCount: -1,
        views: -1,
        createdAt: -1,
      })
      .limit(10);

    res.json(posts);

  } catch(err) {
    res.status(500).json({
      error: err.message
    });
  }
};