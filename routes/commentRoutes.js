import express from "express";
import {
  createComment,
  getCommentsByPost,
  createReply,
  deleteComment,
} from "../controllers/commentController.js";

import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get(
  "/posts/:postId/comments",
  getCommentsByPost
);

router.post(
  "/posts/:postId/comments",
  verifyToken,
  createComment
);

router.post(
  "/comments/:commentId/replies",
  verifyToken,
  createReply
);

router.delete(
  "/comments/:commentId",
  verifyToken,
  deleteComment
);

export default router;