import express from "express";
import {
  createProductDiscussion,
  getProductBySlug,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProductDiscussion);
router.get("/:slug", getProductBySlug);

export default router;