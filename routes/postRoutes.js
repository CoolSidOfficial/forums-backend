
import express from "express";
import {
    createPost,
    getPostsByCategory,
    getPostById,
} from "../controllers/PostController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/posts/:category", verifyToken, createPost);
router.get("/posts/:category", getPostsByCategory);
router.get("/posts/post/:id", getPostById);

export default router