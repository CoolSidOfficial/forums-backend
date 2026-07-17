import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Comment content is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      post: postId,
      user: req.user._id,
      author: req.user.username,
      content: content.trim(),
    });

    await Post.findByIdAndUpdate(postId, {
      $inc: {
        commentsCount: 1,
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create comment",
      error: err.message,
    });
  }
};
// Get all comments with replies for a post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Get top-level comments
    const comments = await Comment.find({
      post: postId,
      parentComment: null,
    }).sort({
      createdAt: 1,
    });

    // Attach replies to each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({
          parentComment: comment._id,
        }).sort({
          createdAt: 1,
        });

        return {
          ...comment.toObject(),
          replies,
        };
      })
    );

    res.status(200).json(commentsWithReplies);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch comments",
      error: err.message,
    });
  }
};
// Create a reply
export const createReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Reply content is required",
      });
    }

    const parentComment = await Comment.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const reply = await Comment.create({
      post: parentComment.post,
      parentComment: parentComment._id,
      user: req.user._id,
      author: req.user.username,
      content: content.trim(),
    });

    await Post.findByIdAndUpdate(parentComment.post, {
      $inc: {
        commentsCount: 1,
      },
    });

    res.status(201).json(reply);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create reply",
      error: err.message,
    });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only comment owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Count replies
    const replyCount = await Comment.countDocuments({
      parentComment: comment._id,
    });

    // Delete replies
    await Comment.deleteMany({
      parentComment: comment._id,
    });

    // Delete comment
    await Comment.findByIdAndDelete(comment._id);

    // Update comment count
    await Post.findByIdAndUpdate(comment.post, {
      $inc: {
        commentsCount: -(replyCount + 1),
      },
    });

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete comment",
      error: err.message,
    });
  }
};