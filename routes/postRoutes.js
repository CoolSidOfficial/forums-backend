
import express from "express";
import {
    createPost,
    getPostsByCategory
} from "../controllers/PostController.js";

const router = express.Router();

router.post("/posts/:category", createPost);
router.get("/posts/:category", getPostsByCategory);

export default router