
import express from "express";
import {
    createPost,
    getPostsByCategory,
    getPostById,
    getTrendingPosts
} from "../controllers/PostController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/posts/:category", verifyToken, createPost);
router.get("/posts/:category", getPostsByCategory);
router.get("/posts/post/:id", getPostById);
router.get("/posts/trending", getTrendingPosts);
export default router